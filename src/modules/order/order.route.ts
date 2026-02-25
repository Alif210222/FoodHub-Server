import { Router } from "express";
import { OrderController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";

const orderRouter = Router()

orderRouter.post("/",auth(UserRole.customer), OrderController.createOrder)
orderRouter.get("/",auth(UserRole.customer), OrderController.getMyOrders)
orderRouter.get("/:id",auth(), OrderController.getOrderById)
orderRouter.get("/provider",auth(UserRole.provider), OrderController.getProviderOrders)


export default orderRouter