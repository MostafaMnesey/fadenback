import { Router } from "express";
import * as serviceController from "./service.controller.js";

const router = Router();

// PATCH /api/dashboard/services/reorder
router.patch("/reorder", serviceController.reorderServices);

// PUT /api/dashboard/services/why-choose-faden
router.put("/why-choose-faden", serviceController.updateWhyChooseFaden);

// PUT /api/dashboard/services/meta
router.put("/meta", serviceController.updateServicesMeta);

// POST /api/dashboard/services
router.post("/", serviceController.createService);

// PUT /api/dashboard/services/:slug/sections
router.put("/:slug/sections", serviceController.updateServiceSections);

// PUT /api/dashboard/services/:slug/projects
router.put("/:slug/projects", serviceController.updateServiceProjects);

// PUT /api/dashboard/services/:id
router.put("/:id", serviceController.updateService);

// DELETE /api/dashboard/services/:id
router.delete("/:id", serviceController.deleteService);

export default router;
