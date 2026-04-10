import type { Request, Response, NextFunction } from "express";
import * as stringsService from "../services/strings.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = {
      brand: req.query.brand as string | undefined,
      material: req.query.material as string | undefined,
      gauge_min: req.query.gauge_min ? Number(req.query.gauge_min) : undefined,
      gauge_max: req.query.gauge_max ? Number(req.query.gauge_max) : undefined,
      sort: req.query.sort as "score" | "name" | "price" | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 12,
    };

    const { data, total } = await stringsService.getAllStrings(filters);
    const page = filters.page;
    const limit = filters.limit;

    res.json({ data, total, page, limit, has_more: page * limit < total });
  } catch (err) {
    next(err);
  }
}

export async function single(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await stringsService.getStringBySlug(req.params.slug);
    if (!item) {
      res.status(404).json({ error: "String not found" });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}
