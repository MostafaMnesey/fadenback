import { Router } from "express";
import * as galleryController from "./gallery.controller.js";

const router = Router();

// GET /api/gallery
router.get("/", galleryController.getAllGallery);

// GET /api/gallery/meta
router.get("/meta", galleryController.getGalleryMeta);

export default router;
