import { Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).user?.id;

    const result = await reviewService.createReview(req.body, customerId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: result,
    });
  } catch (error: any) {
    // console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// const getReviewsByMeal = async (req: Request, res: Response) => {
//   try {
//     const { mealId } = req.params;

//     const result = await ReviewService.getReviewsByMeal(mealId);

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const customerId = (req as any).user.id;
//     const { id } = req.params;

//     const result = await ReviewService.updateReview(id, customerId, req.body);

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(403).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const customerId = (req as any).user.id;
//     const { id } = req.params;

//     await ReviewService.deleteReview(id, customerId);

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error: any) {
//     res.status(403).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const reviewController = {
  createReview,
//   getReviewsByMeal,
//   updateReview,
//   deleteReview,
};