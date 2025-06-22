import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
const app = express();
app.use(cookieParser(process.env.COOKIE_SECURE));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.headers);
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set("Access-Control-Allow-Methods", "POST,PUT");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    next();
});
app.use(express.json());
app.use(express.json());
app.use((err, req, res, next) => {
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
