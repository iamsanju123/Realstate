
import { User } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { IUserSession, UserSession } from "../models/userSession.model.js";

interface AuthRequest extends Request {
  session?: any,
  isAdmin?:boolean
}

export const verifyUser = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const sid = req.signedCookies.sid;
      console.log("sid",sid)
      if (!sid) {
        const response = new ApiResponse(
          404,
          "User has not signed",
          false,
          null
        );
        return res.status(404).json(response);
      }
      const session:IUserSession | null  = await UserSession.findById(sid);
      if (!session || session == null) {
        res.clearCookie("sid");
        const response = new ApiResponse(
          404,
          "User has not signed",
          false,
          null
        );
        return res.status(404).json(response);
      }

      const user = await User.findOne({ _id: session.userSessionId }).lean();
      if (!user) {
       const response = new ApiResponse(
          404,
          "User has not signed",
          false,
          null
        );
        return res.status(404).json(response);
      }
      return res.status(200).json(new ApiResponse(201,"yes is authenticate",true,null))
    } catch (error) {}
  }
);