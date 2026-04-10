import { Router } from "express";
import * as ctrl from "../controllers/strings.controller.js";

const router = Router();

router.get("/", ctrl.list);
router.get("/:slug", ctrl.single);

export default router;
