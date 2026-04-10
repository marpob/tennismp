import sql from "../db/client.js";

export interface TennisString {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  gauge_mm?: number;
  gauge_label?: string;
  material?: string;
  construction?: string;
  colors?: string[];
  power_level?: number;
  control_level?: number;
  spin_level?: number;
  comfort_level?: number;
  durability_level?: number;
  tension_stability?: number;
  review_summary?: string;
  review_body?: string;
  pros?: string[];
  cons?: string[];
  score_overall?: number;
  score_power?: number;
  score_control?: number;
  score_spin?: number;
  score_comfort?: number;
  score_durability?: number;
  tension_min_lb?: number;
  tension_max_lb?: number;
  price_usd?: number;
  image_url?: string;
  affiliate_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface StringFilters {
  brand?: string;
  material?: string;
  gauge_min?: number;
  gauge_max?: number;
  sort?: "score" | "name" | "price";
  page?: number;
  limit?: number;
}

export async function getAllStrings(
  filters: StringFilters
): Promise<{ data: TennisString[]; total: number }> {
  const { brand, material, gauge_min, gauge_max, sort = "score", page = 1, limit = 12 } = filters;

  const conditions: string[] = ["is_published = true"];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (brand) {
    conditions.push(`LOWER(brand) = LOWER($${paramIndex++})`);
    params.push(brand);
  }
  if (material) {
    conditions.push(`material = $${paramIndex++}`);
    params.push(material);
  }
  if (gauge_min !== undefined) {
    conditions.push(`gauge_mm >= $${paramIndex++}`);
    params.push(gauge_min);
  }
  if (gauge_max !== undefined) {
    conditions.push(`gauge_mm <= $${paramIndex++}`);
    params.push(gauge_max);
  }

  const where = conditions.join(" AND ");
  const orderBy =
    sort === "name"
      ? "name ASC"
      : sort === "price"
        ? "price_usd ASC NULLS LAST"
        : "score_overall DESC NULLS LAST";

  const offset = (page - 1) * limit;

  const countResult = await sql(
    `SELECT COUNT(*) as total FROM strings WHERE ${where}`,
    params
  );
  const total = parseInt((countResult[0] as { total: string }).total, 10);

  params.push(limit, offset);
  const data = await sql(
    `SELECT * FROM strings WHERE ${where} ORDER BY ${orderBy} LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
    params
  );

  return { data: data as TennisString[], total };
}

export async function getStringBySlug(slug: string): Promise<TennisString | null> {
  const rows = await sql`
    SELECT * FROM strings WHERE slug = ${slug} AND is_published = true
  `;
  return (rows[0] as TennisString) ?? null;
}
