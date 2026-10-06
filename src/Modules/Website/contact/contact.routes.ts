import { Router } from "express";
import * as contactController from "./contact.controller.js";

const router = Router();

// POST /api/contact/submissions
router.post("/submissions", contactController.createSubmission);

// GET /api/contact/page
router.get("/page", contactController.getContactPage);

export default router;
