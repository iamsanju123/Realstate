import { Notification } from "../models/notification.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendNotificationService = async (
  userIds: string[],
  message: string,
  title: string
) => {
  try {
    if (!(userIds.length > 0)) {
      return new ApiResponse(404, "userId is not found", false, null);
    }
    if (!message) {
      return new ApiResponse(404, "message is not found", false, null);
    }
    const messageData = userIds.map((userId) => ({
      userId,
      message,
      title,
    }));
    if (!(messageData.length > 0)) {
      return new ApiResponse(404, "message data is not found", false, null);
    }
    const data = await Notification.insertMany(messageData);
    console.log(data);
    if (!data) {
      return new ApiResponse(
        404,
        "message is not sending erro in dab operation",
        false,
        null
      );
    }
    return new ApiResponse(201, "message send successfully", true, data);
  } catch (error) {
    return new ApiResponse(501, "error while message sending", false, null);
  }
};

export const getUserNotificationsService = async (userId: string) => {
  try {
    if (!userId) {
      return new ApiResponse(404, "User Id is not found", false, null);
    }
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    if (!notifications) {
      return new ApiResponse(404, "notification is not found", false, null);
    }

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });
    return new ApiResponse(201, "notification IS fetched successfully", true, {
      notifications,
      unreadCount,
    });
  } catch (error) {
    return new ApiResponse(
      501,
      "Error while fetching notification ",
      false,
      null
    );
  }
};

export const markAllAsReadService = async (userId: string) => {
  try {
    if (!userId) {
      return new ApiResponse(404, "user Id is not found ", false, null);
    }
    const data = await Notification.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );
    if (!data) {
      return new ApiResponse(404, "user Id is not found ", false, null);
    }
    return new ApiResponse(201, "data is success fully update", true, data);
  } catch (error) {
    return new ApiResponse(501, "error while fetching", false, null);
  }
};
