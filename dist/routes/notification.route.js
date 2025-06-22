import { Router } from "express";
import { getUserNotifications, markAllAsRead, sendNotification } from "../controllers/notification.controller.js";
const router = Router();
router.route("/").post(sendNotification);
router.route("/:userId").get(getUserNotifications);
router.route("/:userId").patch(markAllAsRead);
export default router;
