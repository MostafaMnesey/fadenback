import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as aboutService from "./about.service.js";

export const updateOverview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await aboutService.updateOverview(req.body);
  return successResponse({ res, status: 200, data: result, message: "ABOUT_OVERVIEW_UPDATED" });
});

export const updateVisionMission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await aboutService.updateVisionMission(req.body);
  return successResponse({ res, status: 200, data: result, message: "ABOUT_VISION_MISSION_UPDATED" });
});

export const updateLeadership = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await aboutService.updateLeadership(req.body);
  return successResponse({ res, status: 200, data: result, message: "ABOUT_LEADERSHIP_UPDATED" });
});

export const updatePartners = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await aboutService.updatePartners(req.body);
  return successResponse({ res, status: 200, data: result, message: "ABOUT_PARTNERS_UPDATED" });
});
