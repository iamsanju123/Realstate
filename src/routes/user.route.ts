import { Router } from "express";
import {  getAllUser, login, loginJwt, logout, register,getUserById, updateUserStatusById } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/authUser.middleware.js";

const router = Router()

router.route('/register').post(register)
router.route('/login').post(loginJwt)
router.route('/').post(verifyUser,logout)
router.route('/').get(getAllUser)
router.route('/:userId').get(getUserById)
router.route('/:userId').patch(updateUserStatusById)
export default router