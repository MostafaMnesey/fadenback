import { Router } from "express";
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

const websiteRouter = Router();

websiteRouter.use("/auth", authRouter);
websiteRouter.use("/gallery", galleryRouter);
websiteRouter.use("/projects", projectRouter);
websiteRouter.use("/project", projectRouter);
websiteRouter.use("/services", serviceRouter);
websiteRouter.use("/service", serviceRouter);
websiteRouter.use("/equipment", equipmentRouter);
websiteRouter.use("/clients", clientRouter);
websiteRouter.use("/client", clientRouter);
websiteRouter.use("/contact", contactRouter);
websiteRouter.use("/settings", settingsRouter);
websiteRouter.use("/about", aboutRouter);
websiteRouter.use("/home-features", homeFeaturesRouter);
websiteRouter.use("/uploads", uploadsRouter);

export default websiteRouter;
