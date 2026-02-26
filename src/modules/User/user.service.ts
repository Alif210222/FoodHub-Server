import { Payload } from './../../../generated/prisma/internal/prismaNamespace';
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Role, UserStatus } from '../../../generated/prisma/enums';

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

interface UpdateUserPayload {
  role?: Role;
  status?: UserStatus;
}


const updateUserRoleAndStatus = async (
  userId: string,
  payload: UpdateUserPayload
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.role && { role: payload.role }),
      ...(payload.status && { status: payload.status }),
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
    },
  });
};




export const UserService = {
    createUser,
    getAllUser,
    loginUser,
    updateUserRoleAndStatus
    };