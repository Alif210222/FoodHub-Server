// src/modules/order/order.service.ts
import { prisma } from "../../lib/prisma";

export const OrderService = {
  // CREATE ORDER (Customer)
  createOrder: async (payload: {
    customerId: string;
    providerId: string;
    items: {
      mealId: string;
      quantity: number;
    }[];
    deliveryAddress: string;
  }) => {
    // Fetch meal details
    const meals = await prisma.meal.findMany({
      where: {
        id: { in: payload.items.map(i => i.mealId) },
      },
    });

    if (meals.length === 0) {
      throw new Error("Invalid meal items");
    }

    // Build order items & total
    let totalAmount = 0;

    const orderItems = payload.items.map(item => {
      const meal = meals.find(m => m.id === item.mealId);
      if (!meal) {
        throw new Error("Meal not found");
      }

      totalAmount += meal.price * item.quantity;

      return {
        mealId: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: item.quantity,
      };
    });

    // Create order
    return prisma.order.create({
      data: {
        customerId: payload.customerId,
        providerId: payload.providerId,
        deliveryAddress: payload.deliveryAddress,
        totalAmount,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });
  },

  // GET ORDERS FOR CUSTOMER
  getOrdersByCustomer: async (customerId: string) => {
    return prisma.order.findMany({
      where: { customerId },
      include: {
        items: true,
        provider: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

   // GET ORDERS FOR PROVIDER
  getOrdersByProvider: async (providerId: string) => {
    return prisma.order.findMany({
      where: { providerId },
      include: {
        items: true,
        customer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

//   // GET SINGLE ORDER (Customer / Provider / Admin)
//   getOrderById: async (orderId: string) => {
//     return prisma.order.findUnique({
//       where: { id: orderId },
//       include: {
//         items: {
//           include: { meal: true },
//         },
//         customer: true,
//         provider: true,
//       },
//     });
//   },

//   // UPDATE ORDER STATUS (Provider)
//   updateOrderStatus: async (
//     orderId: string,
//     providerId: string,
//     status: "ACCEPTED" | "PREPARING" | "DELIVERED" | "CANCELLED"
//   ) => {
//     const order = await prisma.order.findFirst({
//       where: { id: orderId, providerId },
//     });

//     if (!order) {
//       throw new Error("Order not found or unauthorized");
//     }

//     return prisma.order.update({
//       where: { id: orderId },
//       data: { status },
//     });
//   },
};