import { Request,Response,NextFunction } from 'express';
import { prisma } from '../../lib/prisma';
import { UserService } from './user.service';
import sendResponse from "../../utils/sendResponse";


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
           
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
       } catch (error) {
        sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong from login",
      data: null,
    });
       }

}

const getallUser = async(req:Request,res:Response,next: NextFunction) =>{
       try {
        const result = await UserService.getAllUser()

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



export const UserController = {
           register,
           getallUser,
           loginUser
    };