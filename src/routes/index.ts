import { Router } from "express";
import userRouter from "../modules/User/user.route";
import providerRoute from "../modules/provider/provider.route";
import mealRouter from "../modules/meal/meal.route";
import orderRouter from "../modules/order/order.route";


const routes = Router();

routes.use("/user", userRouter)
routes.use("/provider", providerRoute)
routes.use("/provider/meal", mealRouter)
routes.use("/order", orderRouter)

export default routes;