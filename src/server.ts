import app from './app';
import config from './config';
import { prisma } from './lib/prisma';


async function main(){
     try{
        await prisma.$connect();
        console.log("Connected to the database successfully");

       app.listen(config.port, () => {
  console.log(`Server running on : ${config.port}`);
});
     }catch(error){
        console.error("An error occurred: ", error)
        await prisma.$disconnect();
        process.exit(1);
     }
}

main();