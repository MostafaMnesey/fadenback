import { Router } from "express";
import * as homeFeaturesController from "./homeFeatures.controller.js";

const router = Router();

// GET /api/home-features
router.get("/", homeFeaturesController.getHomeFeatures);

export default router;
