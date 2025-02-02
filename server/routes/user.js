import express from "express";
import {
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
  getMyProfile,
  login,
  logOut,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

// UnProtected Routes
app.post("/new", singleAvatar, registerValidator(), newUser);
app.post("/login", loginValidator(), login);

// Protected Routes
app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logOut);
app.get("/search", searchUser);

app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

app.get("/notifications",getAllNotifications)
app.get("/friends",getMyFriends)

export default app;
