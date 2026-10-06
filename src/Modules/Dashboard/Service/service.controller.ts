import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse, errorResponse } from "../../../Utils/Response.js";
import * as serviceService from "./service.service.js";

export const createService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await serviceService.createService(req.body);
  return successResponse({ res, status: 201, data: result, message: "SERVICE_CREATED" });
});

export const updateService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await serviceService.updateService({ id, ...req.body });
  return successResponse({ res, status: 200, data: result, message: "SERVICE_UPDATED" });
});

export const updateServiceSections = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const slug = String(req.params.slug);
  const rawSections = Array.isArray(req.body) ? req.body : req.body.sections;
  if (!Array.isArray(rawSections)) {
    return errorResponse({ req, next, message: "sections array is required", status: 400 });
  }
  const result = await serviceService.updateServiceSections({ slug, sections: rawSections });
  return successResponse({ res, status: 200, data: result, message: "SERVICE_SECTIONS_UPDATED" });
});

export const updateServiceProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const slug = String(req.params.slug);
  const rawProjects = Array.isArray(req.body) ? req.body : req.body.projects;
  if (!Array.isArray(rawProjects)) {
    return errorResponse({ req, next, message: "projects array is required", status: 400 });
  }
  const result = await serviceService.updateServiceProjects({ slug, projects: rawProjects });
  return successResponse({ res, status: 200, data: result, message: "SERVICE_PROJECTS_UPDATED" });
});

export const deleteService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await serviceService.deleteService({ id });
  return res.status(204).send();
});

export const reorderServices = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await serviceService.reorderServices({ orderedIds: req.body.orderedIds });
  return successResponse({ res, status: 200, data: result, message: "SERVICES_REORDERED" });
});

export const updateWhyChooseFaden = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await serviceService.updateWhyChooseFaden(req.body);
  return successResponse({ res, status: 200, data: result, message: "WHY_CHOOSE_FADEN_UPDATED" });
});

export const updateServicesMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await serviceService.updateServicesMeta(req.body);
  return successResponse({ res, status: 200, data: result, message: "SERVICES_META_UPDATED" });
});
