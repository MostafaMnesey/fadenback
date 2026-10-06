import { Router } from "express";
import * as settingsController from "./settings.controller.js";

const router = Router();

// GET /api/settings
router.get("/", settingsController.getSettings);

export default router;
