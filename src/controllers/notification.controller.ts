import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getUserNotificationsService,
  markAllAsReadService,
  sendNotificationService,
} from "../services/notification.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendNotification = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { userIds, message, title } = req.body;
      const response = await sendNotificationService(userIds, message, title);
      if (!response || response == null) {
        return res.json(
          new ApiResponse(
            401,
            "something is wrong when fetch notification",
            false,
            null
          )
        );
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            404,
            "something is wrong when fetch notification",
            false,
            null
          )
        );
    }
  }
);

export const getUserNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const response = await getUserNotificationsService(userId);
      if (!response) {
        return res
          .status(404)
          .json(new ApiResponse(404, "notification is not found", false, null));
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(new ApiResponse(501, "Internal server error", false, null));
    }
  }
);

export const markAllAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const response = markAllAsReadService(userId);
      if (!response) {
        return res
          .status(404)
          .json(new ApiResponse(404, "Internal server error", false, null));
      }
      return res.status(res.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(new ApiResponse(501, "Internal server error", false, null));
    }
  }
);
