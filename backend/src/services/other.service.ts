import sql from "../db/client.js";

export interface OtherItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: "book" | "ball" | "stringing_machine" | "dampener" | "bag" | "grip";
  review_summary?: string;
  review_body?: string;
  pros?: string[];
  cons?: string[];
  score_overall?: number;
  specs?: Record<string, unknown>;
  price_usd?: number;
  image_url?: string;
  affiliate_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export async function getAllOtherItems(filters: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: OtherItem[]; total: number }> {
  const { category, page = 1, limit = 12 } = filters;
  const offset = (page - 1) * limit;

  if (category) {
    const countResult = await sql`
      SELECT COUNT(*) as total FROM other_items
      WHERE is_published = true AND category = ${category}
    `;
    const total = parseInt((countResult[0] as { total: string }).total, 10);
    const data = await sql`
      SELECT * FROM other_items
      WHERE is_published = true AND category = ${category}
      ORDER BY score_overall DESC NULLS LAST
      LIMIT ${limit} OFFSET ${offset}
    `;
    return { data: data as OtherItem[], total };
  }

  const countResult = await sql`
    SELECT COUNT(*) as total FROM other_items WHERE is_published = true
  `;
  const total = parseInt((countResult[0] as { total: string }).total, 10);
  const data = await sql`
    SELECT * FROM other_items WHERE is_published = true
    ORDER BY score_overall DESC NULLS LAST
    LIMIT ${limit} OFFSET ${offset}
  `;
  return { data: data as OtherItem[], total };
}

export async function getOtherItemBySlug(slug: string): Promise<OtherItem | null> {
  const rows = await sql`
    SELECT * FROM other_items WHERE slug = ${slug} AND is_published = true
  `;
  return (rows[0] as OtherItem) ?? null;
}
