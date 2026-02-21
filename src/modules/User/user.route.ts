import { Router } from "express";
import { UserController } from "./user.controller";



const userRouter = Router();

userRouter.post("/register",UserController.register)
userRouter.post("/login",UserController.loginUser)

userRouter.get("/allUser",UserController.getallUser)

export default userRouter
