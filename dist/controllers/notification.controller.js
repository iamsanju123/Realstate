var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserNotificationsService, markAllAsReadService, sendNotificationService, } from "../services/notification.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const sendNotification = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userIds, message, title } = req.body;
        const response = yield sendNotificationService(userIds, message, title);
        if (!response || response == null) {
            return res.json(new ApiResponse(401, "something is wrong when fetch notification", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(404, "something is wrong when fetch notification", false, null));
    }
}));
export const getUserNotifications = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield getUserNotificationsService(userId);
        if (!response) {
            return res
                .status(404)
                .json(new ApiResponse(404, "notification is not found", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error", false, null));
    }
}));
export const markAllAsRead = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = markAllAsReadService(userId);
        if (!response) {
            return res
                .status(404)
                .json(new ApiResponse(404, "Internal server error", false, null));
        }
        return res.status(res.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error", false, null));
    }
}));
