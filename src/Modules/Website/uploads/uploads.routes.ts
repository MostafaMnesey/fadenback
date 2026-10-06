import { Router, Request, Response, NextFunction } from "express";
import { localMulterUpload, fileValidation } from "../../../Utils/Multer/local.multer.js";
import { asyncHandler, successResponse, errorResponse } from "../../../Utils/Response.js";
import type { CustomMulterFile } from "../../../Types/request.js";

const router = Router();

const upload = localMulterUpload({
  customPath: "media",
  validation: fileValidation.image,
});

// POST /api/uploads
router.post(
  "/",
  upload.single("file"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as CustomMulterFile | undefined;
    if (!file) {
      return errorResponse({ req, next, message: "File is required", status: 400 });
    }
    const url = `/${file.finalPath || file.path}`;
    return successResponse({ res, status: 201, data: { url }, message: "FILE_UPLOADED" });
  })
);

export default router;
