import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as serviceService from "./service.service.js";

export const getAllServices = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const services = await serviceService.getAllServices();
  return successResponse({ res, status: 200, data: services });
});

export const getServiceBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const slug = String(req.params.slug);
  const service = await serviceService.getServiceBySlug(slug);
  return successResponse({ res, status: 200, data: service });
});

export const getWhyChooseFaden = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const whyChoose = await serviceService.getWhyChooseFaden();
  return successResponse({ res, status: 200, data: whyChoose });
});

export const getServicesMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const meta = await serviceService.getServicesMeta();
  return successResponse({ res, status: 200, data: meta });
});
