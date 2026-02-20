import { Request,Response } from 'express';
import { prisma } from '../../lib/prisma';


const register = async (req:Request,res:Response) =>{
    const Payload = req.body;

    const user = await prisma.user.create({
        data:Payload,
    })

    res.send({message:"Registered user successfully" , data:user})
}



export const UserController = {
           register
    };