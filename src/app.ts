import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './modules/User/user.route';
import routes from './routes';
import cookieParser from "cookie-parser";
import { notFound } from './middlewares/notFound';
import errorHandler from './middlewares/globalErrorHandler';

const app: Application = express();



// parsers  midleware
// app.use(cors({
//     origin: process.env.APP_URL || "http://localhost:3000",  // client side url 
//     credentials:true
// }))

const allowedOrigins = [
  "http://localhost:3000",
  "https://foodhub-client-seven.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

 
//app.options(/.*/, cors());


app.use(express.json());
app.use(cookieParser())

// application routes
app.use("/" , routes)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Alif  World !');  
});


app.use(notFound)
//app.use(errorHandler)


app.all(/.*/, (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});



export default app;
