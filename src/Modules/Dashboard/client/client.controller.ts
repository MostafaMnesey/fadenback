import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as clientService from "./client.service.js";

export const createClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await clientService.createClient(req.body);
  return successResponse({ res, status: 201, data: result, message: "CLIENT_CREATED" });
});

export const updateClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await clientService.updateClient({ id, ...req.body });
  return successResponse({ res, status: 200, data: result, message: "CLIENT_UPDATED" });
});

export const deleteClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await clientService.deleteClient({ id });
  return res.status(204).send();
});

export const updateClientsMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await clientService.updateClientsMeta(req.body);
  return successResponse({ res, status: 200, data: result, message: "CLIENTS_META_UPDATED" });
});
