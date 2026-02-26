import express from "express";

import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";


const reviewRouter = express.Router();


// Public
 reviewRouter.get("/meal/:mealId", reviewController.getReviewsByMeal);

// Customer only
reviewRouter.post("/", auth(UserRole.customer), reviewController.createReview);
 reviewRouter.patch("/:id", auth(UserRole.customer), reviewController.updateReview);
// reviewRouter.delete("/:id", auth(UserRole.customer), reviewController.deleteReview);



export   default reviewRouter;