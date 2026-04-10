import { Router } from "express";
import * as ctrl from "../controllers/picker.controller.js";

const router = Router();

router.post("/guided", ctrl.guided);
router.get("/filter", ctrl.filter);

export default router;
