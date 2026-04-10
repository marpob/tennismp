import { Router } from "express";
import * as ctrl from "../controllers/blog.controller.js";

const router = Router();

router.get("/", ctrl.list);
router.get("/:slug", ctrl.single);

export default router;
