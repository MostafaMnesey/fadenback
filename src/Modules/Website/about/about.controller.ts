import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as aboutService from "./about.service.js";

export const getOverview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await aboutService.getOverview();
  return successResponse({ res, status: 200, data: item });
});

export const getVisionMission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await aboutService.getVisionMission();
  return successResponse({ res, status: 200, data: item });
});

export const getLeadership = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await aboutService.getLeadership();
  return successResponse({ res, status: 200, data: item });
});

export const getPartners = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await aboutService.getPartners();
  return successResponse({ res, status: 200, data: item });
});
