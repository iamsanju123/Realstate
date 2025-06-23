var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { allSessionsLogoutOfUserByIdService, getAllUserService, listOfUserService, loginJwtService, loginService, logoutService, logoutUserBySessionIdService, registerService, } from "../services/user.service.js";
export const register = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword, role } = req.body;
        const response = yield registerService(username, email, password, confirmPassword, role.toString());
        if (!response) {
            return res.status(404).json(new ApiResponse(404, "something is error while register", false, null));
        }
        return res.status(response === null || response === void 0 ? void 0 : response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        const response = new ApiResponse(501, "Internal Error at registration", false, null);
        return res.status(501).json(response);
    }
}));
export const loginJwt = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield loginJwtService(email, password);
        if (!response) {
            return new ApiResponse(404, "something error while user login", false, null);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return new ApiResponse(501, "something error while user login", false, null);
    }
}));
export const login = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield loginService(email, password);
        if (!response) {
            return new ApiResponse(401, "error on generating session", false, null);
        }
        if (!response.success) {
            return res.status(response.statusCode).json(response);
        }
        if (response.success && response.statusCode == 201) {
            const { option, session } = response.data;
            res.cookie("sid", session._id, option);
            return res.status(response.statusCode).json(response);
        }
    }
    catch (error) {
        const response = new ApiResponse(501, "Internal Error while login", false, null);
        return res.status(501).json(response);
    }
}));
export const logout = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.session._id;
        const response = yield logoutService(data);
        if (!response) {
            return new ApiResponse(501, "no session is found", false, null);
        }
        return res.status(response === null || response === void 0 ? void 0 : response.statusCode).json(response);
    }
    catch (error) {
        const response = new ApiResponse(501, "Internal Error while logout", false, null);
        return res.status(501).json(response);
    }
}));
export const forgetPassword = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
//admin
export const listOfUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 0, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const rawLimit = parseInt(limit, 10);
        const limitNumber = Math.max(5, Math.min(10, rawLimit));
        const response = yield listOfUserService(pageNumber, limitNumber);
        if (!response) {
            return res
                .status(501)
                .json(new ApiResponse(501, "Internal Error while find list of user", false, null));
        }
        return res.status(response === null || response === void 0 ? void 0 : response.statusCode).json(response);
    }
    catch (error) {
        const response = new ApiResponse(501, "Internal Error while find list of user", false, null);
        return res.status(501).json(response);
    }
}));
export const allSessionsLogoutOfUserById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userSessionId } = req.params;
        const response = yield allSessionsLogoutOfUserByIdService(userSessionId);
        if (!response) {
            return res
                .status(404)
                .json(new ApiResponse(404, "Error while userSessionsLogout", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal error while session logout", false, null));
    }
}));
export const logoutUserBySessionId = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        const response = yield logoutUserBySessionIdService(sessionId);
        if (!response) {
            return res
                .status(404)
                .json(new ApiResponse(404, "Error while userSessionsLogout", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal error while session logout", false, null));
    }
}));
export const getAllUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userId = req.session.userSessionId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const response = yield getAllUserService(page, limit);
        if (!response) {
            return res
                .status(501)
                .json(new ApiResponse(501, "Internal error while fetching user data", false, null));
        }
        if (response && response.success) {
            return res.status(response.statusCode).json(response);
        }
    }
    catch (error) { }
}));
