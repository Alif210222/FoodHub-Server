import { Request,Response,NextFunction } from 'express';
import { prisma } from '../../lib/prisma';
import { UserService } from './user.service';
import sendResponse from "../../utils/sendResponse";
import { Role, UserStatus } from '../../../generated/prisma/enums';


const register = async (req:Request,res:Response,next: NextFunction) =>{
    try {
        const result = await UserService.createUser(req.body)

        //  console.log("user created !");

         sendResponse(res, {
             statusCode: 201,
             success: true,
             message: "User created successfully",
             data: result,

            
           });
           } catch (error) {
                  next(error);
           }
  
}

// Log in 
const loginUser = async(req:Request,res:Response)=>{
       try {
        const result = await UserService.loginUser(req.body)
        //console.log(result);

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", result.token, {
           secure: isProduction,
           httpOnly: true,
           sameSite: isProduction ? "none" : "lax", // none / strict / lax
         });
           
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
       } catch (error:any) {
        sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || ("Credential missing !") ,
      data: null,
    });
       }

}


const getMyProfile = async (req: Request, res: Response) => {
  try {
    //  from auth middleware (decoded token)
    const email = (req as any).user.email;

    const result = await UserService.getMyProfile(email);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


const getallUser = async(req:Request,res:Response,next: NextFunction) =>{
       try {
        const result = await UserService.getAllUser()

        // console.log(result);

         sendResponse(res, {
             statusCode: 201,
             success: true,
             message: "User created successfully",
             data: result,

            
           });
           } catch (error) {
                  next(error);
           }
  
}


// Admin features
const updateUserRoleAndStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    if (role && !Object.values(Role).includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if (status && !Object.values(UserStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    if (!role && !status) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const result = await UserService.updateUserRoleAndStatus(id as string, {
      role,
      status,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};



export const UserController = {
           register,
           getallUser,
           getMyProfile,
           loginUser,
           updateUserRoleAndStatus
    };