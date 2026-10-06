import { Request, Response, NextFunction } from "express";
import { asyncHandler, successResponse } from "../../../Utils/Response.js";
import * as contactService from "./contact.service.js";

export const getSubmissions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await contactService.getSubmissions();
  return successResponse({ res, status: 200, data: result });
});

export const markSubmissionRead = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const result = await contactService.markSubmissionRead({ id });
  return successResponse({ res, status: 200, data: result, message: "SUBMISSION_MARKED_READ" });
});

export const deleteSubmission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  await contactService.deleteSubmission({ id });
  return res.status(204).send();
});

export const updateContactPage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const result = await contactService.updateContactPage(req.body);
  return successResponse({ res, status: 200, data: result, message: "CONTACT_PAGE_UPDATED" });
});
