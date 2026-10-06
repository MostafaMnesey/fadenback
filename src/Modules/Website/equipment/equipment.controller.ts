import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as equipmentService from "./equipment.service.js";

export const getAllEquipment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const equipment = await equipmentService.getAllEquipment();
  return successResponse({ res, status: 200, data: equipment });
});

export const getEquipmentMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const meta = await equipmentService.getEquipmentMeta();
  return successResponse({ res, status: 200, data: meta });
});
