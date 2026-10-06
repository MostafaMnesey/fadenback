import { Router } from "express";
import * as projectController from "./project.controller.js";

const router = Router();

// GET /api/projects
router.get("/", projectController.getAllProjects);

// GET /api/projects/categories
router.get("/categories", projectController.getProjectCategories);

// GET /api/projects/meta
router.get("/meta", projectController.getProjectsMeta);

// GET /api/projects/by-slug/:slug
router.get("/by-slug/:slug", projectController.getProjectBySlug);

export default router;
