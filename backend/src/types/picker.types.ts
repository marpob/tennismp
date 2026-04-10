import type { Racquet } from "./racquet.types.js";

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
