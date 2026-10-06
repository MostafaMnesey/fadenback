import { Router } from "express";
import * as clientController from "./client.controller.js";

const router = Router();

// GET /api/clients
router.get("/", clientController.getAllClients);

// GET /api/clients/meta
router.get("/meta", clientController.getClientsMeta);

export default router;
