import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse, errorResponse } from "../../../Utils/Response.js";
import * as authService from "./auth.service.js";

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorResponse({ req, next, message: "Email and password are required", status: 400 });
  }

  const result = await authService.login({ email, password });
  return successResponse({ res, status: 200, data: result, message: "LOGIN_SUCCESS" });
});
