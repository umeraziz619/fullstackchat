import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import {getOtherMember} from '../lib/helper.js'
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  // console.log("name is =====>",name)
  // console.log("Avatar is =====>",avatar)

  const avatar = {
    public_id: "Sfdfd",
    url: "dfdfdf",
  };
  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });

  sendToken(res, user, 201, "User Created Successfully.");
  //   res.status(201).json({ message: "User Created Successfully" });
};
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("InValid Username", 404));
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("InValid Password", 404));
  }
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    data: user,
  });
  // return await User.findById();
});
const logOut = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chat-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout Successfully!",
    });
});
const searchUser = TryCatch(async (req, res, next) => {
  const { name } = req.query;
  console.log("Req user is", req.user);
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  // All UsersFrom My Chats means friends or people I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });
  const users = allUsersExceptMeAndFriends.map((i) => ({
    ...i._doc,
    avatar: i.avatar.url,
  }));
  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) {
    return next(new ErrorHandler("Request Already Exist", 400));
  }

  await Request.create({ sender: req.user, receiver: userId });

  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend Request Sent!",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }
  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(new ErrorHandler("Unathorized not allowed", 404));
  }

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected!",
    });
  }
  
  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} and ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted!",
    senderId: request.sender._id,
  });
});

const  getAllNotifications = TryCatch(async (req, res,next) => {
  const request = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = request.map(({_id,sender})=>({
    _id,
    sender:{
      _id:sender._id,
      name:sender.name,
      avatar:sender.avatar.url,
    }
  }))

  return res.status(200).json({
    success: true,
    data:allRequests,
  });
});


const  getMyFriends = TryCatch(async (req, res,next) => {

  const chatId = req.query.chatId;
  const chats = await Chat.find({
    members:req.user,
    groupChat:false,
  }).populate("members","name avatar");

  const friends = chats.map(({members})=>{
    const otherUser = getOtherMember(members,req.user);
    return {
      _id:otherUser._id,
      name:otherUser.name,
      avatar:otherUser.avatar.url,
    }
  })

  if(chatId){
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend)=>!chat.members.includes(friend._id)
    )
    return res.status(200).json({
      success: true,
      friends:availableFriends,
    });
  }else{
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});
export {
  login,
  acceptFriendRequest,
  newUser,
  getMyProfile,
  logOut,
  searchUser,
  sendFriendRequest,
  getAllNotifications,
  getMyFriends
};
