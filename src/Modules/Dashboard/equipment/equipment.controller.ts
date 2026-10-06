import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as equipmentService from "./equipment.service.js";

export const createEquipment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await equipmentService.createEquipment(req.body);
  return successResponse({ res, status: 201, data: result, message: "EQUIPMENT_CREATED" });
});

export const updateEquipment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await equipmentService.updateEquipment({ id, ...req.body });
  return successResponse({ res, status: 200, data: result, message: "EQUIPMENT_UPDATED" });
});

export const deleteEquipment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await equipmentService.deleteEquipment({ id });
  return res.status(204).send();
});

export const updateEquipmentMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await equipmentService.updateEquipmentMeta(req.body);
  return successResponse({ res, status: 200, data: result, message: "EQUIPMENT_META_UPDATED" });
});
