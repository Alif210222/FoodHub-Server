// src/modules/meal/meal.route.ts
import { Router } from "express";
import { mealController } from "./meal.controler";
import auth, { UserRole } from "../../middlewares/auth";


const mealRouter = Router();

// PUBLIC ROUTES

// PROVIDER ROUTES
mealRouter.post("/",auth(UserRole.provider), mealController.createMeal);
mealRouter.get("/",mealController.getAllMeal)
mealRouter.get("/:id",mealController.getSingleMeal)
mealRouter.patch("/:id",auth(UserRole.provider),mealController.updateMeal)


export default mealRouter;