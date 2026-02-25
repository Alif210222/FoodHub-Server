import { Request ,Response,NextFunction} from "express";
import { mealService } from "./meal.service";
import { prisma } from "../../lib/prisma";



const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: req.user?.id },
    });

    if (!provider) {
      throw new Error("Provider profile not found");
    }

    const result = await mealService.createMeal({
      ...req.body,
      providerId: provider.id, // ✅ correct ID
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};



const getAllMeal = async(req: Request, res: Response) =>{
     try {
      const result = await mealService.getAllMeal(req.query);

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
}

const getSingleMeal =async(req: Request, res: Response) =>{
        try {
      const { id } = req.params ;
      const result = await mealService.getSingleMeal(id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Meal not found",
        });
      }

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
}

const updateMeal = async(req: Request, res: Response) =>{

       try {
      const { id } = req.params;
      const provider = await prisma.provider.findUnique({
      where: { userId: req.user?.id },
    });
    const providerId = provider?.id



      const result = await mealService.updateMeal(
        id,
        providerId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Meal updated successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
      
}

const deleteMeal = async(req: Request, res: Response) =>{

    try {
      const { id } = req.params;
      const provider = await prisma.provider.findUnique({
      where: { userId: req.user?.id },
    });
    const providerId = provider?.id

      const result = await mealService.deleteMeal(
        id,
        providerId
      );

      res.status(200).json({
        success: true,
        message: "Meal delete successfully",
        
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
      
}

export const mealController = {
      createMeal,
      getAllMeal,
      getSingleMeal,
      updateMeal,
      deleteMeal
}