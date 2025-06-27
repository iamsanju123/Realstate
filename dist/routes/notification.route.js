import { Router } from "express";
import { getUserNotifications, markAllAsRead, sendNotification, listofAllNotification } from "../controllers/notification.controller.js";
const router = Router();
router.route("/").post(sendNotification);
router.route("/:userId").get(getUserNotifications);
router.route("/:userId").patch(markAllAsRead);
router.route('/').get(listofAllNotification);
export default router;
