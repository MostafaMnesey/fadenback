import { Router } from "express";
import * as clientController from "./client.controller.js";

const router = Router();

// PUT /api/dashboard/clients/meta (Must precede /:id)
router.put("/meta", clientController.updateClientsMeta);

// POST /api/dashboard/clients
router.post("/", clientController.createClient);

// PUT /api/dashboard/clients/:id
router.put("/:id", clientController.updateClient);

// DELETE /api/dashboard/clients/:id
router.delete("/:id", clientController.deleteClient);

export default router;
