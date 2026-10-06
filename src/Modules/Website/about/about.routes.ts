import { Router } from "express";
import * as aboutController from "./about.controller.js";

const router = Router();

// GET /api/about/overview
router.get("/overview", aboutController.getOverview);

// GET /api/about/vision-mission
router.get("/vision-mission", aboutController.getVisionMission);

// GET /api/about/leadership
router.get("/leadership", aboutController.getLeadership);

// GET /api/about/partners
router.get("/partners", aboutController.getPartners);

export default router;
