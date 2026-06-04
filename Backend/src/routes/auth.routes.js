import express from "express";
import {register,login, updatePassword} from "../controllers/auth.controller.js"
import {authenticateUser} from "../middleware/auth.middleware.js"

const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put(
  "/update-password",
  authenticateUser,
  updatePassword
);
export default authRouter;