import sql from "../db/client.js";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  author: string;
  category?: string;
  tags?: string[];
  cover_image_url?: string;
  read_time_min?: number;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export async function getAllBlogPosts(filters: {
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: BlogPost[]; total: number }> {
  const { category, tag, page = 1, limit = 10 } = filters;
  const conditions: string[] = ["is_published = true"];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (category) {
    conditions.push(`category = $${paramIndex++}`);
    params.push(category);
  }
  if (tag) {
    conditions.push(`$${paramIndex++} = ANY(tags)`);
    params.push(tag);
  }

  const where = conditions.join(" AND ");
  const offset = (page - 1) * limit;

  const countResult = await sql(
    `SELECT COUNT(*) as total FROM blog_posts WHERE ${where}`,
    params
  );
  const total = parseInt((countResult[0] as { total: string }).total, 10);

  params.push(limit, offset);
  const data = await sql(
    `SELECT id, slug, title, excerpt, author, category, tags, cover_image_url, read_time_min, published_at, created_at, updated_at
     FROM blog_posts WHERE ${where}
     ORDER BY published_at DESC NULLS LAST
     LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
    params
  );

  return { data: data as BlogPost[], total };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND is_published = true
  `;
  return (rows[0] as BlogPost) ?? null;
}
