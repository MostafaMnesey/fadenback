import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as projectService from "./project.service.js";

export const getAllProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const projects = await projectService.getAllProjects();
  return successResponse({ res, status: 200, data: projects });
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const slug = String(req.params.slug);
  const project = await projectService.getProjectBySlug(slug);
  return successResponse({ res, status: 200, data: project });
});

export const getProjectCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await projectService.getProjectCategories();
  return successResponse({ res, status: 200, data: categories });
});

export const getProjectsMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const meta = await projectService.getProjectsMeta();
  return successResponse({ res, status: 200, data: meta });
});
