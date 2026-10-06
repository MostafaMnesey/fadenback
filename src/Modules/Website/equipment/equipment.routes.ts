import { Router } from "express";
import * as equipmentController from "./equipment.controller.js";

const router = Router();

// GET /api/equipment
router.get("/", equipmentController.getAllEquipment);

// GET /api/equipment/meta
router.get("/meta", equipmentController.getEquipmentMeta);

export default router;
