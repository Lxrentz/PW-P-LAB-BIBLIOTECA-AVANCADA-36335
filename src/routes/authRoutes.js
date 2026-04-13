import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post("/signup", signUpUser)
authRouter.post("/signin", signInUser)

export default authRouter