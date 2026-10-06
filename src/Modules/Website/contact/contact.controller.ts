import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as contactService from "./contact.service.js";

export const createSubmission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await contactService.createSubmission(req.body);
  return successResponse({ res, status: 201, data: result, message: "SUBMISSION_SENT" });
});

export const getContactPage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const page = await contactService.getContactPage();
  return successResponse({ res, status: 200, data: page });
});
