import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/authUser.middleware.js";
const router = Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').post(verifyUser, logout);
export default router;
