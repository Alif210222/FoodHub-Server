import { Result } from './../../../generated/prisma/internal/prismaNamespace';
import { Provider } from './../../../generated/prisma/client';
import { Request,Response,NextFunction } from "express";

import sendResponse from '../../utils/sendResponse';
import { providerService } from './provider.service';
import { includes } from 'zod';


const createProvider = async(req:Request, res:Response,next: NextFunction)=>{

    try {
        const Payload = req.body; 

        const result = await providerService.createProvider(Payload);

        console.log("Provider  create done!");

         sendResponse(res, {
             statusCode: 201,
             success: true,
             message: "Provider created successfully",
             data: result,
           });
        
    } catch (error) {
        next(error)
    }

}

const getAllProvider = async(req:Request, res:Response,next: NextFunction)=>{

    try {
        const result = await providerService.getAllProvider();
         sendResponse(res, {
             statusCode: 201,
             success: true,
             message: "Provider get successfully",
             data: result,
           });
        
    } catch (error) {
        next(error)
    }

}

export const providerController =  {
        createProvider,
        getAllProvider
}