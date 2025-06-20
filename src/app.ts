import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const app: express.Application = express();

app.use(cookieParser(process.env.COOKIE_SECURE));

app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:5173','http://192.168.43.168:5173','http://192.168.1.11:5173'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
   if(origin){
   console.log(origin)
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }}

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
  });
});

import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

export { app };
