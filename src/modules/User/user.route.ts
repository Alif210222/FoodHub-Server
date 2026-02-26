import { Router } from "express";
import { UserController } from "./user.controller";
import auth, { UserRole } from "../../middlewares/auth";



const userRouter = Router();

userRouter.post("/register",UserController.register)
userRouter.post("/login",UserController.loginUser)
userRouter.get("/allUser",UserController.getallUser)
userRouter.patch("/admin/:id",auth(UserRole.admin), UserController.updateUserRoleAndStatus)

export default userRouter
