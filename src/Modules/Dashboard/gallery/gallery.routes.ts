import { Router } from "express";
import * as galleryController from "./gallery.controller.js";

const router = Router();

// PUT /api/dashboard/gallery/meta (Must precede /:id)
router.put("/meta", galleryController.updateGalleryMeta);

// POST /api/dashboard/gallery
router.post("/", galleryController.createGallery);

// PUT /api/dashboard/gallery/:id
router.put("/:id", galleryController.updateGallery);

// DELETE /api/dashboard/gallery/:id
router.delete("/:id", galleryController.deleteGallery);

export default router;
