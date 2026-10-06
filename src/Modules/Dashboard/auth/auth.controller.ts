import { Response, NextFunction } from "express";
import { asyncHandler, successResponse, errorResponse } from "../../../Utils/Response.js";
import { AuthenticatedRequest } from "../../../Middlewares/requireAuth.js";
import * as authService from "./auth.service.js";

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.id) {
    return errorResponse({ req, next, message: "Invalid or missing token", status: 401 });
  }

  const user = await authService.getMe(req.user.id);
  return successResponse({ res, status: 200, data: user, message: "USER_FETCHED" });
});
