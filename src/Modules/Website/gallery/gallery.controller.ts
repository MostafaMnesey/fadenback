import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as galleryService from "./gallery.service.js";

export const getAllGallery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const images = await galleryService.getAllGallery();
  return successResponse({ res, status: 200, data: images });
});

export const getGalleryMeta = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const meta = await galleryService.getGalleryMeta();
  return successResponse({ res, status: 200, data: meta });
});
