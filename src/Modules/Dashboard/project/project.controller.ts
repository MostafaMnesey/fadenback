import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as projectService from "./project.service.js";

export const createProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await projectService.createProject(req.body);
  return successResponse({ res, status: 201, data: result, message: "PROJECT_CREATED" });
});

export const updateProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await projectService.updateProject({ id, ...req.body });
  return successResponse({ res, status: 200, data: result, message: "PROJECT_UPDATED" });
});

export const updateProjectDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await projectService.updateProjectDetail({ id, detail: req.body });
  return successResponse({ res, status: 200, data: result, message: "PROJECT_DETAIL_UPDATED" });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await projectService.deleteProject({ id });
  return res.status(204).send();
});

export const reorderProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await projectService.reorderProjects({ orderedIds: req.body.orderedIds });
  return successResponse({ res, status: 200, data: result, message: "PROJECTS_REORDERED" });
});

export const updateProjectsMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await projectService.updateProjectsMeta(req.body);
  return successResponse({ res, status: 200, data: result, message: "PROJECTS_META_UPDATED" });
});
