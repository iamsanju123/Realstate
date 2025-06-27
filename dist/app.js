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
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set("Access-Control-Allow-Methods", "POST,PUT,PATCH,GET,HEAD,DELETE");
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
import notificationRouter from "./routes/notification.route.js";
import advisoryRoutes from './routes/advisory.route.js';
import propertiesRouter from "./routes/documents/properties.route.js";
import financialDetailRouter from './routes/documents/financialDetail.route.js';
import salesRelatedDetailRouter from './routes/documents/salesRelatedDetails.route.js';
import landDetailRouter from './routes/documents/landDetails.routes.js';
import legalDetailRouter from './routes/documents/legalDetails.route.js';
import projectDetailRouter from './routes/documents/projectDetail.route.js';
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/notification", notificationRouter);
app.use('/api/v1/advisory', advisoryRoutes);
app.use('/api/v1/doc/property', propertiesRouter);
app.use('/api/v1/doc/financial', financialDetailRouter);
app.use('/api/v1/doc/sales', salesRelatedDetailRouter);
app.use('/api/v1/doc/land', landDetailRouter);
app.use('/api/v1/doc/legal', legalDetailRouter);
app.use('/api/v1/doc/project', projectDetailRouter);
export { app };
