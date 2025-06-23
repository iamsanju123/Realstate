import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const app: express.Application = express();

app.use(cookieParser(process.env.COOKIE_SECURE));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req:Request,res:Response,next:NextFunction)=>{
  res.set("Access-Control-Allow-Origin",req.headers.origin)
    res.set('Access-Control-Allow-Credentials', 'true');
  res.set("Access-Control-Allow-Methods","POST,PUT,PATCH,GET,HEAD,DELETE")
  res.set("Access-Control-Allow-Headers","Content-Type, Authorization")
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // No Content
  }
  next()
})

app.use(express.json());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
  });
});

import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import notificationRouter from "./routes/notification.route.js"

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/notification",notificationRouter)

export { app };
