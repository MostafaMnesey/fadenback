import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as galleryService from "./gallery.service.js";

export const createGallery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await galleryService.createGallery(req.body);
  return successResponse({ res, status: 201, data: result, message: "GALLERY_CREATED" });
});

export const updateGallery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await galleryService.updateGallery({ id, ...req.body });
  return successResponse({ res, status: 200, data: result, message: "GALLERY_UPDATED" });
});

export const deleteGallery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await galleryService.deleteGallery({ id });
  return res.status(204).send();
});

export const updateGalleryMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await galleryService.updateGalleryMeta(req.body);
  return successResponse({ res, status: 200, data: result, message: "GALLERY_META_UPDATED" });
});
