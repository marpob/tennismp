import type { Request, Response, NextFunction } from "express";
import * as racquetsService from "../services/racquets.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
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

    const { data, total } = await racquetsService.getAllRacquets(filters);
    const page = filters.page;
    const limit = filters.limit;

    res.json({
      data,
      total,
      page,
      limit,
      has_more: page * limit < total,
    });
  } catch (err) {
    next(err);
  }
}

export async function single(req: Request, res: Response, next: NextFunction) {
  try {
    const racquet = await racquetsService.getRacquetBySlug(req.params.slug);
    if (!racquet) {
      res.status(404).json({ error: "Racquet not found" });
      return;
    }
    res.json(racquet);
  } catch (err) {
    next(err);
  }
}

export async function brands(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await racquetsService.getRacquetBrands();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
