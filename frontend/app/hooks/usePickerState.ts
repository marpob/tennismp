import { useState } from "react";
import type { AgeGroup, GameStyle, Preference, GuidedPickerInput } from "~/lib/types";

export type PickerStep = 1 | 2 | 3;

interface PickerState {
  step: PickerStep;
  age_group?: AgeGroup;
  game_style?: GameStyle;
  preference?: Preference;
}

export function usePickerState() {
  const [state, setState] = useState<PickerState>({ step: 1 });

  const setAge = (age_group: AgeGroup) =>
    setState((s) => ({ ...s, age_group, step: 2 }));

  const setStyle = (game_style: GameStyle) =>
    setState((s) => ({ ...s, game_style, step: 3 }));

  const setPreference = (preference: Preference) =>
    setState((s) => ({ ...s, preference }));

  const reset = () => setState({ step: 1 });

  const back = () =>
    setState((s) => ({ ...s, step: Math.max(1, s.step - 1) as PickerStep }));

  const isComplete =
    state.age_group !== undefined &&
    state.game_style !== undefined &&
    state.preference !== undefined;

  const input: GuidedPickerInput | null = isComplete
    ? {
        age_group: state.age_group!,
        game_style: state.game_style!,
        preference: state.preference!,
      }
    : null;

  return { state, setAge, setStyle, setPreference, reset, back, input };
}
