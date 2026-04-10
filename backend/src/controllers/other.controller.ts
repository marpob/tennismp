import type { Request, Response, NextFunction } from "express";
import * as otherService from "../services/other.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = {
      category: req.query.category as string | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 12,
    };

    const { data, total } = await otherService.getAllOtherItems(filters);
    const page = filters.page;
    const limit = filters.limit;

    res.json({ data, total, page, limit, has_more: page * limit < total });
  } catch (err) {
    next(err);
  }
}

export async function single(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await otherService.getOtherItemBySlug(req.params.slug);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}
