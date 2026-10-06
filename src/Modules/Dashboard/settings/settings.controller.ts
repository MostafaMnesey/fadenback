import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as settingsService from "./settings.service.js";

export const updateSettings = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await settingsService.updateSettings(req.body);
  return successResponse({ res, status: 200, data: result, message: "SETTINGS_UPDATED" });
});
