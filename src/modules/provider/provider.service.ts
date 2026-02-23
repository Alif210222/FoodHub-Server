import { Payload } from './../../../generated/prisma/internal/prismaNamespace';
import { prisma } from "../../lib/prisma"

const createProvider = async (payload:any) =>{

     if (!payload.userId) {
    throw new Error("User ID is required to create provider");
  }
    const result = await prisma.provider.create({
         data:{...payload}
    })

    return result;

}



const getAllProvider = async () =>{
    const result = await prisma.provider.findMany({
        include:{user:true}
    })
    return result;

}

export const providerService =  {
    createProvider,
    getAllProvider
}