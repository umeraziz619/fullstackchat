import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDb = (url) => {
  mongoose
    .connect(url, { dbName: "ChatApp" })
    .then((data) => {
      console.log(`Connect To DB ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chat-token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emiting Event", event);
};

const deleteFilesFromCloundinary = async (public_ids) => {};
export {
  connectDb,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloundinary,
};
