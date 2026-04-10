import { Router } from "express";
import * as ctrl from "../controllers/other.controller.js";

const router = Router();

router.get("/", ctrl.list);
router.get("/:slug", ctrl.single);

export default router;
