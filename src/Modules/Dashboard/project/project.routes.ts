import { Router } from "express";
import * as projectController from "./project.controller.js";

const router = Router();

// PATCH /api/dashboard/projects/reorder (Must be before /:id)
router.patch("/reorder", projectController.reorderProjects);

// PUT /api/dashboard/projects/meta (Must be before /:id)
router.put("/meta", projectController.updateProjectsMeta);

// POST /api/dashboard/projects
router.post("/", projectController.createProject);

// PUT /api/dashboard/projects/:id/detail
router.put("/:id/detail", projectController.updateProjectDetail);

// PUT /api/dashboard/projects/:id
router.put("/:id", projectController.updateProject);

// DELETE /api/dashboard/projects/:id
router.delete("/:id", projectController.deleteProject);

export default router;
