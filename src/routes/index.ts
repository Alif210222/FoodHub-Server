import { Router } from "express";
import userRouter from "../modules/User/user.route";
import providerRoute from "../modules/provider/provider.route";

const routes = Router();

routes.use("/user", userRouter)
routes.use("/provider", providerRoute)

export default routes;