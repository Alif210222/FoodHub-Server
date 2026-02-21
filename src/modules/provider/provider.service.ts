import { Payload } from './../../../generated/prisma/internal/prismaNamespace';
import { prisma } from "../../lib/prisma"

const createProvider = async (Payload:any) =>{
    const result = await prisma.provider.create({
         data:Payload
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