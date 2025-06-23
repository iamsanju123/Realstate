var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserSession } from "../models/userSession.model.js";
export const verifyUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sid = req.signedCookies.sid;
        // console.log("sid",sid)
        if (!sid) {
            const response = new ApiResponse(404, "User has not signed", false, null);
            return res.status(404).json(response);
        }
        const session = yield UserSession.findById(sid);
        if (!session || session == null) {
            res.clearCookie("sid");
            const response = new ApiResponse(404, "User has not signed", false, null);
            return res.status(404).json(response);
        }
        const user = yield User.findOne({ _id: session.userSessionId }).lean();
        if (!user) {
            const response = new ApiResponse(404, "User has not signed", false, null);
            return res.status(404).json(response);
        }
        req.session = session;
        req.isAdmin = user.isAdmin;
        next();
    }
    catch (error) { }
}));
