import sql from "../db/client.js";
import type { Racquet } from "../types/racquet.types.js";
import type {
  AgeGroup,
  GameStyle,
  GuidedPickerInput,
  PickerResult,
  Preference,
} from "../types/picker.types.js";

// --- Scoring functions ---

function scoreAge(racquet: Racquet, ageGroup: AgeGroup): number {
  let score = 10; // baseline for all groups

  if (ageGroup === "junior") {
    if (racquet.weight_g !== undefined && racquet.weight_g < 280) score += 5;
    if (racquet.head_size_sq_in !== undefined && racquet.head_size_sq_in >= 100) score += 3;
    if (racquet.maneuverability !== undefined && racquet.maneuverability >= 7) score += 2;
  } else if (ageGroup === "senior") {
    if (racquet.weight_g !== undefined && racquet.weight_g < 295) score += 4;
    if (racquet.stiffness_ra !== undefined && racquet.stiffness_ra < 65) score += 3;
    if (racquet.score_comfort !== undefined && racquet.score_comfort >= 7) score += 3;
  } else {
    // adult: no penalties, just full baseline
    score += 10;
  }

  return Math.min(score, 20);
}

type AttributeKey = "spin_level" | "control_level" | "power_level" | "maneuverability";
type StyleWeights = Partial<Record<AttributeKey, number>>;

function scoreGameStyle(racquet: Racquet, style: GameStyle): number {
  const weights: Record<GameStyle, StyleWeights> = {
    baseliner: { spin_level: 8, control_level: 7, power_level: 5 },
    aggressive_baseliner: { power_level: 9, spin_level: 8, control_level: 3 },
    all_court: { control_level: 6, power_level: 6, maneuverability: 6, spin_level: 5 },
    serve_and_volley: { maneuverability: 10, control_level: 8, power_level: 2 },
    defensive: { maneuverability: 8, power_level: 7, control_level: 5 },
  };

  const w = weights[style];
  let raw = 0;
  let maxRaw = 0;

  for (const [attr, weight] of Object.entries(w) as [AttributeKey, number][]) {
    const val = (racquet[attr] as number | undefined) ?? 5;
    raw += val * weight;
    maxRaw += 10 * weight;
  }

  return maxRaw === 0 ? 0 : Math.round((raw / maxRaw) * 35);
}

function scorePreference(racquet: Racquet, pref: Preference): number {
  const attrMap: Record<Preference, (r: Racquet) => number> = {
    more_control: (r) =>
      ((r.score_control ?? 5) + (r.control_level ?? 5)) / 2,
    more_power: (r) =>
      ((r.score_power ?? 5) + (r.power_level ?? 5)) / 2,
    more_spin: (r) =>
      ((r.score_spin ?? 5) + (r.spin_level ?? 5)) / 2,
    more_speed: (r) =>
      ((r.score_maneuverability ?? 5) + (r.maneuverability ?? 5)) / 2,
    balance: (r) => {
      const vals = [
        r.score_power,
        r.score_control,
        r.score_spin,
        r.score_comfort,
        r.score_maneuverability,
      ].filter((v): v is number => v !== undefined);
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 5;
    },
  };

  const raw = attrMap[pref](racquet);
  return Math.round((raw / 10) * 35);
}

function buildMatchReasons(
  racquet: Racquet,
  input: GuidedPickerInput,
  ageScore: number,
  styleScore: number,
  prefScore: number
): string[] {
  const reasons: string[] = [];

  if (ageScore >= 18) {
    const ageLabels: Record<AgeGroup, string> = {
      junior: "Lightweight and easy to swing — great for junior players",
      adult: "Well-suited for adult players across all skill levels",
      senior: "Comfortable and forgiving — excellent for senior players",
    };
    reasons.push(ageLabels[input.age_group]);
  }

  if (styleScore >= 28) {
    const styleLabels: Record<GameStyle, string> = {
      baseliner: "High spin and control potential — ideal for baseliners",
      aggressive_baseliner: "Powerful and spin-friendly for aggressive play",
      all_court: "Versatile specs for all-court game",
      serve_and_volley: "Maneuverable and precise for net play",
      defensive: "Easy to redirect pace and cover court",
    };
    reasons.push(styleLabels[input.game_style]);
  }

  if (prefScore >= 28) {
    const prefLabels: Record<Preference, string> = {
      more_control: "Exceptional control characteristics",
      more_power: "High power output to complement your game",
      more_spin: "Excellent spin generation",
      more_speed: "Fast and maneuverable through the air",
      balance: "Well-balanced across all performance metrics",
    };
    reasons.push(prefLabels[input.preference]);
  }

  if (reasons.length === 0) {
    reasons.push("Good overall match for your profile");
  }

  return reasons;
}

// --- Main picker function ---

export async function getGuidedPickerResults(
  input: GuidedPickerInput
): Promise<PickerResult[]> {
  const racquets = await sql`
    SELECT * FROM racquets WHERE is_published = true
  `;

  // Fetch curated boosts for this age_group + game_style
  const boostRows = await sql`
    SELECT racquet_id, score_boost FROM racquet_picker_tags
    WHERE age_group = ${input.age_group} AND game_style = ${input.game_style}
  `;
  const boostMap = new Map<number, number>(
    boostRows.map((r) => {
      const row = r as { racquet_id: number; score_boost: number };
      return [row.racquet_id, row.score_boost];
    })
  );

  const scored: PickerResult[] = (racquets as Racquet[]).map((racquet) => {
    const ageScore = scoreAge(racquet, input.age_group);
    const styleScore = scoreGameStyle(racquet, input.game_style);
    const prefScore = scorePreference(racquet, input.preference);
    const boost = boostMap.get(racquet.id) ?? 0;
    const total = ageScore + styleScore + prefScore + boost;

    return {
      racquet,
      score: Math.min(total, 100),
      match_reasons: buildMatchReasons(racquet, input, ageScore, styleScore, prefScore),
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
