import type { Request, Response, NextFunction } from "express";
import * as blogService from "../services/blog.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = {
      category: req.query.category as string | undefined,
      tag: req.query.tag as string | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const { data, total } = await blogService.getAllBlogPosts(filters);
    const page = filters.page;
    const limit = filters.limit;

    res.json({ data, total, page, limit, has_more: page * limit < total });
  } catch (err) {
    next(err);
  }
}

export async function single(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await blogService.getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
}
