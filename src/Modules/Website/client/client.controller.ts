import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as clientService from "./client.service.js";

export const getAllClients = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const clients = await clientService.getAllClients();
  return successResponse({ res, status: 200, data: clients });
});

export const getClientsMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const meta = await clientService.getClientsMeta();
  return successResponse({ res, status: 200, data: meta });
});
