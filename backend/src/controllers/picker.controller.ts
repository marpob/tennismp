import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { getGuidedPickerResults } from "../services/picker.service.js";
import { getAllRacquets } from "../services/racquets.service.js";

const guidedSchema = z.object({
  age_group: z.enum(["junior", "adult", "senior"]),
  game_style: z.enum([
    "baseliner",
    "aggressive_baseliner",
    "all_court",
    "serve_and_volley",
    "defensive",
  ]),
  preference: z.enum([
    "more_control",
    "more_power",
    "more_spin",
    "more_speed",
    "balance",
  ]),
});

export async function guided(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = guidedSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const results = await getGuidedPickerResults(parsed.data);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

export async function filter(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = {
      brand: req.query.brand as string | undefined,
      weight_min: req.query.weight_min ? Number(req.query.weight_min) : undefined,
      weight_max: req.query.weight_max ? Number(req.query.weight_max) : undefined,
      head_size_min: req.query.head_size_min ? Number(req.query.head_size_min) : undefined,
      head_size_max: req.query.head_size_max ? Number(req.query.head_size_max) : undefined,
      balance_type: req.query.balance_type as string | undefined,
      swingweight_min: req.query.swingweight_min ? Number(req.query.swingweight_min) : undefined,
      swingweight_max: req.query.swingweight_max ? Number(req.query.swingweight_max) : undefined,
      stiffness_min: req.query.stiffness_min ? Number(req.query.stiffness_min) : undefined,
      stiffness_max: req.query.stiffness_max ? Number(req.query.stiffness_max) : undefined,
      power_level_min: req.query.power_level_min ? Number(req.query.power_level_min) : undefined,
      swing_speed: req.query.swing_speed as string | undefined,
      color: req.query.color as string | undefined,
      string_pattern: req.query.string_pattern as string | undefined,
      sort: req.query.sort as "score" | "name" | "weight" | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 12,
    };

    const { data, total } = await getAllRacquets(filters);
    const page = filters.page;
    const limit = filters.limit;

    res.json({ data, total, page, limit, has_more: page * limit < total });
  } catch (err) {
    next(err);
  }
}
