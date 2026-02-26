import { prisma } from "../../lib/prisma";

const createReview = async (
  payload: {
    mealId: string;
    rating: number;
    comment?: string;
  },
  customerId: string
) => {
  // Optional: check meal exists
  const meal = await prisma.meal.findUnique({
    where: { id: payload.mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  return prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      meal: {
        connect: { id: payload.mealId },
      },
      customer: {
        connect: { id: customerId },
      },
    },
  });
};

const getReviewsByMeal = async (mealId: string) => {
  return prisma.review.findMany({
    where: { mealId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


const updateReview = async (
  reviewId: string,
  customerId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.customerId !== customerId) {
    throw new Error("Unauthorized or review not found");
  }

  return prisma.review.update({
    where: { id: reviewId },
    data: payload,
  });
};

// const deleteReview = async (reviewId: string, customerId: string) => {
//   const review = await prisma.review.findUnique({
//     where: { id: reviewId },
//   });

//   if (!review || review.customerId !== customerId) {
//     throw new Error("Unauthorized or review not found");
//   }

//   return prisma.review.delete({
//     where: { id: reviewId },
//   });
// };

export const reviewService = {
  createReview,
   getReviewsByMeal,
   updateReview,
//   deleteReview,
};