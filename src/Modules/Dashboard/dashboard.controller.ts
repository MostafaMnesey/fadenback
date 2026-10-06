import { Router } from "express";
import { requireAuth } from "../../Middlewares/requireAuth.js";
import authRouter from "./auth/auth.routes.js";
import galleryRouter from "./gallery/gallery.routes.js";
import projectRouter from "./project/project.routes.js";
import serviceRouter from "./Service/service.routes.js";
import equipmentRouter from "./equipment/equipment.routes.js";
import clientRouter from "./client/client.routes.js";
import contactRouter from "./contact/contact.routes.js";
import settingsRouter from "./settings/settings.routes.js";
import aboutRouter from "./about/about.routes.js";
import homeFeaturesRouter from "./homeFeatures/homeFeatures.routes.js";
import uploadsRouter from "./uploads/uploads.routes.js";

const dashboardRouter = Router();

// Apply auth middleware for all dashboard routes
dashboardRouter.use(requireAuth);

dashboardRouter.use("/auth", authRouter);
dashboardRouter.use("/gallery", galleryRouter);
dashboardRouter.use("/projects", projectRouter);
dashboardRouter.use("/project", projectRouter);
dashboardRouter.use("/services", serviceRouter);
dashboardRouter.use("/service", serviceRouter);
dashboardRouter.use("/equipment", equipmentRouter);
dashboardRouter.use("/clients", clientRouter);
dashboardRouter.use("/client", clientRouter);
dashboardRouter.use("/contact", contactRouter);
dashboardRouter.use("/settings", settingsRouter);
dashboardRouter.use("/about", aboutRouter);
dashboardRouter.use("/home-features", homeFeaturesRouter);
dashboardRouter.use("/uploads", uploadsRouter);

export default dashboardRouter;
