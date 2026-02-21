import { Payload } from './../../../generated/prisma/internal/prismaNamespace';
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

// user create 

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

     return user;
       
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