import { Router } from "express";
import * as contactController from "./contact.controller.js";

const router = Router();

// GET /api/dashboard/contact/submissions
router.get("/submissions", contactController.getSubmissions);

// PATCH /api/dashboard/contact/submissions/:id/read
router.patch("/submissions/:id/read", contactController.markSubmissionRead);

// DELETE /api/dashboard/contact/submissions/:id
router.delete("/submissions/:id", contactController.deleteSubmission);

// PUT /api/dashboard/contact/page
router.put("/page", contactController.updateContactPage);

export default router;
