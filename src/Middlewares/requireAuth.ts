import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../Utils/Token/token.js";
import { errorResponse } from "../Utils/Response.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
    [key: string]: any;
  };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse({ req, next, message: "Invalid or missing token", status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return errorResponse({ req, next, message: "Invalid or missing token", status: 401 });
  }

  try {
    const decoded = verifyToken({ token }) as { id: string; email?: string; role?: string };
    if (!decoded || !decoded.id) {
      return errorResponse({ req, next, message: "Invalid or missing token", status: 401 });
    }
    req.user = decoded;
    return next();
  } catch (err) {
    return errorResponse({ req, next, message: "Invalid or missing token", status: 401 });
  }
};
