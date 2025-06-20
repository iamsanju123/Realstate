import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  allSessionsLogoutOfUserByIdService,
  getAllUserService,
  listOfUserService,
  loginService,
  logoutService,
  logoutUserBySessionIdService,
  registerService,
} from "../services/user.service.js";
import { pool } from "../db/mysql.db.js";

interface AuthRequest extends Request {
  session?: any; // Define `user` as needed
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const { role } = req.query;
    if (!role) {
      return;
    }
    const response = await registerService(
      username,
      email,
      password,
      confirmPassword,
      role.toString()
    );
    if (!response) {
      return;
    }
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    console.log(error);
    const response = new ApiResponse(
      501,
      "Internal Error at registration",
      false,
      null
    );
    return res.status(501).json(response);
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await loginService(email, password);

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
  } catch (error) {
    const response = new ApiResponse(
      501,
      "Internal Error while login",
      false,
      null
    );
    return res.status(501).json(response);
  }
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const data = req.session._id;
    const response = await logoutService(data);
    if (!response) {
      return new ApiResponse(501, "no session is found", false, null);
    }
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponse(
      501,
      "Internal Error while logout",
      false,
      null
    );
    return res.status(501).json(response);
  }
});

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response) => {}
);

//admin

export const listOfUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { page = 0, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const rawLimit = parseInt(limit as string, 10);
    const limitNumber = Math.max(5, Math.min(10, rawLimit));
    const response = await listOfUserService(pageNumber, limitNumber);
    if (!response) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal Error while find list of user",
            false,
            null
          )
        );
    }
    return res.status(response?.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponse(
      501,
      "Internal Error while find list of user",
      false,
      null
    );
    return res.status(501).json(response);
  }
});

export const allSessionsLogoutOfUserById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { userSessionId } = req.params;
      const response = await allSessionsLogoutOfUserByIdService(userSessionId);
      if (!response) {
        return res
          .status(404)
          .json(
            new ApiResponse(404, "Error while userSessionsLogout", false, null)
          );
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal error while session logout",
            false,
            null
          )
        );
    }
  }
);

export const logoutUserBySessionId = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const response = await logoutUserBySessionIdService(sessionId);
      if (!response) {
        return res
          .status(404)
          .json(
            new ApiResponse(404, "Error while userSessionsLogout", false, null)
          );
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal error while session logout",
            false,
            null
          )
        );
    }
  }
);
export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    // const userId = req.session.userSessionId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const response = await getAllUserService(page, limit);
    if (!response) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal error while fetching user data",
            false,
            null
          )
        );
    }
    if (response && response.success) {
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {}
});
