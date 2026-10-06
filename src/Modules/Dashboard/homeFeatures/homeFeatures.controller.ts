import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as homeFeaturesService from "./homeFeatures.service.js";

export const updateHomeFeatureSection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const section = String(req.params.section);
    const rawIds = Array.isArray(req.body) ? req.body : req.body.ids;
    const result = await homeFeaturesService.updateHomeFeatureSection({
      section,
      ids: rawIds,
    });
    return successResponse({
      res,
      status: 200,
      data: result,
      message: "HOME_FEATURES_SECTION_UPDATED",
    });
  }
);
