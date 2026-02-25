import { prisma } from "../../lib/prisma";

interface CreateMealPayload {
  name: string;
  description?: string;
  price: number;
  image?: string;
  dietaryTags?: string[];
  categoryId?: string;
  providerId: string;
}


const createMeal = async(payload: any)=>{


     return prisma.meal.create({
       data: payload,
    });

}

const getAllMeal = async(query: any)=>{
      const { search, minPrice, maxPrice, categoryId, providerId } = query;
      return prisma.meal.findMany({
      where: {
        isAvailable: true,
        providerId: providerId || undefined,
        categoryId: categoryId || undefined,
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined,
        },
        name: search
          ? { contains: search, mode: "insensitive" }
          : undefined,
      },
      include: {
        provider: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
} 


const getSingleMeal = (id:string) =>{
    return prisma.meal.findUnique({
      where: { id },
      include: {
        provider: true,
        category: true,
        reviews: {
          include: {
            customer: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
}

const updateMeal = async( mealId: string,
    providerId: string,
    data: Partial<CreateMealPayload>) =>{
        //Checking valid provider 
        const meal = await prisma.meal.findFirst({
        where: { id: mealId, providerId },
    });

    if (!meal) {
      throw new Error("Meal not found or unauthorized");
    }

     return prisma.meal.update({
      where: { id: mealId },
      data,
    });

}


const deleteMeal = async( mealId: string,
    providerId: string) =>{
        //Checking valid provider 
        const meal = await prisma.meal.findFirst({
        where: { id: mealId, providerId },
    });

    if (!meal) {
      throw new Error("Meal not found or unauthorized");
    }

     return prisma.meal.delete({
      where:  {id:mealId}
    });

}


export const mealService = {
       createMeal,
       getAllMeal,
       getSingleMeal,
       updateMeal,
       deleteMeal
}