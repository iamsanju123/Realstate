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
app.use(
  cors({
    // origin: "http://localhost:5173",
    // credentials: true,
  })
);
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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

export { app };
