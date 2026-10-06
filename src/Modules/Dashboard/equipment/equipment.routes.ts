import { Router } from "express";
import * as equipmentController from "./equipment.controller.js";

const router = Router();

// PUT /api/dashboard/equipment/meta (Must precede /:id)
router.put("/meta", equipmentController.updateEquipmentMeta);

// POST /api/dashboard/equipment
router.post("/", equipmentController.createEquipment);

// PUT /api/dashboard/equipment/:id
router.put("/:id", equipmentController.updateEquipment);

// DELETE /api/dashboard/equipment/:id
router.delete("/:id", equipmentController.deleteEquipment);

export default router;
