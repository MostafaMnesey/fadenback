import { Router } from "express";
import * as settingsController from "./settings.controller.js";

const router = Router();

// PUT /api/dashboard/settings
router.put("/", settingsController.updateSettings);

export default router;
