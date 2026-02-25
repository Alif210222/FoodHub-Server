
// src/modules/order/order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./order.service";

export const OrderController = {
  // CREATE ORDER
  createOrder: async (req: Request, res: Response) => {
    try {
      const customerId = (req as any).user.id;

      const result = await OrderService.createOrder({
        customerId,
        providerId: req.body.providerId,
        items: req.body.items,
        deliveryAddress: req.body.deliveryAddress,
      });

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET MY ORDERS (Customer)
   getMyOrders: async (req: Request, res: Response) => {
    try {
      const customerId = (req as any).user.id;

      const result = await OrderService.getOrdersByCustomer(customerId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // GET PROVIDER ORDERS
//   getProviderOrders: async (req: Request, res: Response) => {
//     try {
//       const providerId = (req as any).user.id;

//       const result = await OrderService.getOrdersByProvider(providerId);

//       res.status(200).json({
//         success: true,
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

//   // GET ORDER DETAILS
//   getOrderById: async (req: Request, res: Response) => {
//     try {
//       const order = await OrderService.getOrderById(req.params.id);

//       if (!order) {
//         return res.status(404).json({
//           success: false,
//           message: "Order not found",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         data: order,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

//   // UPDATE ORDER STATUS (Provider)
//   updateOrderStatus: async (req: Request, res: Response) => {
//     try {
//       const providerId = (req as any).user.id;
//       const { status } = req.body;

//       const result = await OrderService.updateOrderStatus(
//         req.params.id,
//         providerId,
//         status
//       );

//       res.status(200).json({
//         success: true,
//         message: "Order status updated",
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(403).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },
};