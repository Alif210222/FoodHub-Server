
// src/modules/order/order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { prisma } from "../../lib/prisma";

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
        message:error.message,
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



  // GET PROVIDER ORDERS controller
  getProviderOrders: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      console.log(userId);

       //  Step 1: Find provider using userId
    const provider = await prisma.provider.findUnique({
      where: { userId },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    console.log(provider.id);



    //  Step 2: Use provider.id
    const result = await OrderService.getOrdersByProvider(
      provider.id
    );

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

  //get all order for admin
    getAdminOrders: async (req: Request, res: Response) => {
    try {
      

      const result = await OrderService.getOrdersByAdmin();

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

  // GET ORDER DETAILS
  getOrderById: async (req: Request, res: Response) => {
    try {
      const order = await OrderService.getOrderById(req.params.id as string);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

   // UPDATE ORDER STATUS (Provider)
   updateOrderStatus: async (req: Request, res: Response) => {
    try {
      const providerId = (req as any).user.providerId;
      const { status } = req.body;

      const result = await OrderService.updateOrderStatus(
        req.params.id as string,
        providerId,
        status
      );

      res.status(200).json({
        success: true,
        message: "Order status updated",
        data: result,
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
   },

   // get provider states 
   getProviderStats: async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const provider = await prisma.provider.findFirst({
      where: { userId },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const stats = await OrderService.getProviderStats(provider.id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

 };