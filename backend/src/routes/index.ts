import type { Express } from "express";
import racquetsRouter from "./racquets.js";
import stringsRouter from "./strings.js";
import otherRouter from "./other.js";
import blogRouter from "./blog.js";
import pickerRouter from "./picker.js";

export function mountRoutes(app: Express): void {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/racquets", racquetsRouter);
  app.use("/api/strings", stringsRouter);
  app.use("/api/other", otherRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/picker", pickerRouter);
}
