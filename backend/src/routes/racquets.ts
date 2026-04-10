import { Router } from "express";
import * as ctrl from "../controllers/racquets.controller.js";

const router = Router();

router.get("/brands", ctrl.brands);
router.get("/", ctrl.list);
router.get("/:slug", ctrl.single);

export default router;
