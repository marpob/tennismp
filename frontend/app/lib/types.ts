export interface Racquet {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year?: number;
  weight_g?: number;
  head_size_sq_in?: number;
  length_in?: number;
  balance_mm?: number;
  balance_type?: "head_heavy" | "head_light" | "even";
  swingweight?: number;
  stiffness_ra?: number;
  beam_width_mm?: string;
  string_pattern?: string;
  power_level?: number;
  spin_level?: number;
  control_level?: number;
  maneuverability?: number;
  recommended_swing_speed?: "slow" | "medium" | "fast";
  skill_level?: "beginner" | "intermediate" | "advanced" | "all";
  player_type?: string[];
  review_summary?: string;
  review_body?: string;
  pros?: string[];
  cons?: string[];
  score_overall?: number;
  score_power?: number;
  score_control?: number;
  score_spin?: number;
  score_comfort?: number;
  score_maneuverability?: number;
  image_url?: string;
  affiliate_url?: string;
  colors?: string[];
  published_at?: string;
}

export interface TennisString {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  gauge_mm?: number;
  gauge_label?: string;
  material?: "polyester" | "multifilament" | "natural_gut" | "hybrid" | "synthetic_gut" | "kevlar";
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
  published_at?: string;
}

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
  published_at?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  author: string;
  category?: string;
  tags?: string[];
  cover_image_url?: string;
  read_time_min?: number;
  published_at?: string;
}

export type AgeGroup = "junior" | "adult" | "senior";
export type GameStyle =
  | "baseliner"
  | "aggressive_baseliner"
  | "all_court"
  | "serve_and_volley"
  | "defensive";
export type Preference =
  | "more_control"
  | "more_power"
  | "more_spin"
  | "more_speed"
  | "balance";

export interface GuidedPickerInput {
  age_group: AgeGroup;
  game_style: GameStyle;
  preference: Preference;
}

export interface PickerResult {
  racquet: Racquet;
  score: number;
  match_reasons: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}
