// src/modules/meal/meal.route.ts
import { Router } from "express";
import { mealController } from "./meal.controler";
import auth, { UserRole } from "../../middlewares/auth";


const mealRouter = Router();

// PUBLIC ROUTES

mealRouter.get("/",mealController.getAllMeal)
mealRouter.get("/:id",mealController.getSingleMeal)

// PROVIDER ROUTES
mealRouter.post("/",auth(UserRole.provider), mealController.createMeal);
mealRouter.patch("/:id",auth(UserRole.provider),mealController.updateMeal)
mealRouter.delete("/:id",auth(UserRole.provider),mealController.deleteMeal)




export default mealRouter;