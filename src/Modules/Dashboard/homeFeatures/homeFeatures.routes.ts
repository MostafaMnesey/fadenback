
import { Router } from "express";
import * as homeFeaturesController from "./homeFeatures.controller.js";

const router = Router();

// PUT /api/dashboard/home-features/:section
router.put("/:section", homeFeaturesController.updateHomeFeatureSection);

export default router;
