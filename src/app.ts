import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './modules/User/user.route';

const app: Application = express();

// parsers  midleware
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",  // client side url 
    credentials:true
}))
app.use(express.json());

// application routes
app.use(userRouter)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Alifs Apollo Gears World !');
});



export default app;
