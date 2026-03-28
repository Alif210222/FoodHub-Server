import { Router } from "express";
import { OrderController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";

const orderRouter = Router()

orderRouter.post("/",auth(UserRole.customer), OrderController.createOrder)
orderRouter.get("/",auth(UserRole.customer,UserRole.admin), OrderController.getMyOrders)
orderRouter.get("/admin",auth(UserRole.admin), OrderController.getAdminOrders)
orderRouter.get("/provider",auth(UserRole.provider), OrderController.getProviderOrders)
orderRouter.get("/provider/stats",auth(UserRole.provider),OrderController.getProviderStats);
orderRouter.get("/:id",auth(), OrderController.getOrderById)
orderRouter.patch("/:id",auth(UserRole.provider), OrderController.updateOrderStatus)


export default orderRouter;