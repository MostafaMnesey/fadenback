import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as homeFeaturesService from "./homeFeatures.service.js";

export const getHomeFeatures = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await homeFeaturesService.getHomeFeatures();
  return successResponse({ res, status: 200, data: result });
});
