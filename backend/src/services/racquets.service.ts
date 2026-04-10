import sql from "../db/client.js";
import type { Racquet, RacquetFilters } from "../types/racquet.types.js";

export async function getAllRacquets(
  filters: RacquetFilters
): Promise<{ data: Racquet[]; total: number }> {
  const {
    brand,
    weight_min,
    weight_max,
    head_size_min,
    head_size_max,
    balance_type,
    swingweight_min,
    swingweight_max,
    stiffness_min,
    stiffness_max,
    power_level_min,
    swing_speed,
    color,
    string_pattern,
    sort = "score",
    page = 1,
    limit = 12,
  } = filters;

  const conditions: string[] = ["is_published = true"];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (brand) {
    conditions.push(`LOWER(brand) = LOWER($${paramIndex++})`);
    params.push(brand);
  }
  if (weight_min !== undefined) {
    conditions.push(`weight_g >= $${paramIndex++}`);
    params.push(weight_min);
  }
  if (weight_max !== undefined) {
    conditions.push(`weight_g <= $${paramIndex++}`);
    params.push(weight_max);
  }
  if (head_size_min !== undefined) {
    conditions.push(`head_size_sq_in >= $${paramIndex++}`);
    params.push(head_size_min);
  }
  if (head_size_max !== undefined) {
    conditions.push(`head_size_sq_in <= $${paramIndex++}`);
    params.push(head_size_max);
  }
  if (balance_type) {
    conditions.push(`balance_type = $${paramIndex++}`);
    params.push(balance_type);
  }
  if (swingweight_min !== undefined) {
    conditions.push(`swingweight >= $${paramIndex++}`);
    params.push(swingweight_min);
  }
  if (swingweight_max !== undefined) {
    conditions.push(`swingweight <= $${paramIndex++}`);
    params.push(swingweight_max);
  }
  if (stiffness_min !== undefined) {
    conditions.push(`stiffness_ra >= $${paramIndex++}`);
    params.push(stiffness_min);
  }
  if (stiffness_max !== undefined) {
    conditions.push(`stiffness_ra <= $${paramIndex++}`);
    params.push(stiffness_max);
  }
  if (power_level_min !== undefined) {
    conditions.push(`power_level >= $${paramIndex++}`);
    params.push(power_level_min);
  }
  if (swing_speed) {
    conditions.push(`recommended_swing_speed = $${paramIndex++}`);
    params.push(swing_speed);
  }
  if (color) {
    conditions.push(`$${paramIndex++} = ANY(colors)`);
    params.push(color);
  }
  if (string_pattern) {
    conditions.push(`string_pattern = $${paramIndex++}`);
    params.push(string_pattern);
  }

  const where = conditions.join(" AND ");
  const orderBy =
    sort === "name"
      ? "name ASC"
      : sort === "weight"
        ? "weight_g ASC NULLS LAST"
        : "score_overall DESC NULLS LAST";

  const offset = (page - 1) * limit;

  const countResult = await sql(
    `SELECT COUNT(*) as total FROM racquets WHERE ${where}`,
    params
  );
  const total = parseInt((countResult[0] as { total: string }).total, 10);

  params.push(limit, offset);
  const data = await sql(
    `SELECT * FROM racquets WHERE ${where} ORDER BY ${orderBy} LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
    params
  );

  return { data: data as Racquet[], total };
}

export async function getRacquetBySlug(slug: string): Promise<Racquet | null> {
  const rows = await sql`
    SELECT * FROM racquets WHERE slug = ${slug} AND is_published = true
  `;
  return (rows[0] as Racquet) ?? null;
}

export async function getRacquetBrands(): Promise<string[]> {
  const rows = await sql`
    SELECT DISTINCT brand FROM racquets WHERE is_published = true ORDER BY brand ASC
  `;
  return rows.map((r) => (r as { brand: string }).brand);
}
