import { Payload } from './../../../generated/prisma/internal/prismaNamespace';
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// user create 
export const secret = "lsdngkdsbfgbkdf"

  const createUser = async(Payload:any)=>{
    const hashedPassword = await bcrypt.hash(Payload.password,8)

    const result = await prisma.user.create({
        data:{...Payload,password:hashedPassword}
    })
    const {password, ...newResult} = result;
    return newResult
  }

  //loging user 

  const loginUser =async(payload:any) =>{

     const user = await prisma.user.findUnique({
        where:{
            email:payload.email,
        }
        
     });
        if (!user) {
            throw new Error("User not found!");
          }
        
          const ispasswordMatched = await bcrypt.compare(
            payload.password,
            user.password,
          );
        
          if (!ispasswordMatched) {
            throw new Error("Invalid credentials!!");
          }

          const userData = {
             id: user.id,
             name:user.name,
             role:user.role,
             status:user.status,
             email:user.email
          };

          const token  = jwt.sign(userData,secret,{expiresIn:"4d"})



     return {user, token};
       
  }


  const getAllUser = async () =>{
        const result = await prisma.user.findMany()
        return result;
          
  }




export const UserService = {
    createUser,
    getAllUser,
    loginUser
    };