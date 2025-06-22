import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  session?: any;
  isAdmin?: boolean;
}

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userAdmin = req.isAdmin; // This assumes you have a previous middleware that sets `req.user` from JWT
    // console.log(userAdmin);
    if (userAdmin) {
      return next();
    }

    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
