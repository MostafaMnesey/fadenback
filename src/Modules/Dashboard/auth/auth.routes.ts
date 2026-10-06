import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router();

// GET /api/dashboard/auth/me
router.get("/me", authController.getMe);

export default router;
