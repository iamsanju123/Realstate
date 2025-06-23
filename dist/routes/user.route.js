import { Router } from "express";
import { getAllUser, loginJwt, logout, register } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/authUser.middleware.js";
const router = Router();
router.route('/register').post(register);
router.route('/login').post(loginJwt);
router.route('/').post(verifyUser, logout);
router.route('/').get(getAllUser);
export default router;
