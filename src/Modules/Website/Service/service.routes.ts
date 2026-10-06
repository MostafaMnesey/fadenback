import { Router } from "express";
import * as serviceController from "./service.controller.js";

const router = Router();

// GET /api/services
router.get("/", serviceController.getAllServices);

// GET /api/services/why-choose-faden
router.get("/why-choose-faden", serviceController.getWhyChooseFaden);

// GET /api/services/meta
router.get("/meta", serviceController.getServicesMeta);

// GET /api/services/by-slug/:slug
router.get("/by-slug/:slug", serviceController.getServiceBySlug);

export default router;
