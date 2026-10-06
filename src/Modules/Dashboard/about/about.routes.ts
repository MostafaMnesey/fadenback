import { Router } from "express";
import * as aboutController from "./about.controller.js";

const router = Router();

// PUT /api/dashboard/about/overview
router.put("/overview", aboutController.updateOverview);

// PUT /api/dashboard/about/vision-mission
router.put("/vision-mission", aboutController.updateVisionMission);

// PUT /api/dashboard/about/leadership
router.put("/leadership", aboutController.updateLeadership);

// PUT /api/dashboard/about/partners
router.put("/partners", aboutController.updatePartners);

export default router;
