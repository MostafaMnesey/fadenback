import { Router } from "express";
import dashboardRoutes from "./Modules/Dashboard/dashboard.controller.js";
import websiteRoutes from "./Modules/Website/website.controller.js";

const rootRouter = Router();

// ─── Admin Dashboard Endpoints (/api/dashboard/...) ───────────────────────────
rootRouter.use("/api/dashboard", dashboardRoutes);
rootRouter.use("/dashboard", dashboardRoutes);

// ─── Public Website Endpoints (/api/...) ──────────────────────────────────────
rootRouter.use("/api", websiteRoutes);
rootRouter.use("/website", websiteRoutes);

rootRouter.get("/test", (req, res) => {
  return res.json({ message: "OK" });
});

export default rootRouter;
