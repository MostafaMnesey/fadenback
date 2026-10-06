import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as settingsService from "./settings.service.js";

export const getSettings = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const settings = await settingsService.getSettings();
  return successResponse({ res, status: 200, data: settings });
});
