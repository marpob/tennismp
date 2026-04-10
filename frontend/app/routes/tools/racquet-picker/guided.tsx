import { useState } from "react";
import type { Route } from "./+types/guided";
import { usePickerState } from "~/hooks/usePickerState";
import AgeStep from "~/components/picker/steps/AgeStep";
import StyleStep from "~/components/picker/steps/StyleStep";
import PreferenceStep from "~/components/picker/steps/PreferenceStep";
import PickerResultCard from "~/components/picker/PickerResult";
import type { PickerResult } from "~/lib/types";
import { apiFetch } from "~/lib/api";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Guided Racquet Picker — tennismp" },
    { name: "description", content: "Answer 3 questions and get your top 5 personalised racquet recommendations." },
  ];
}

export default function GuidedPicker() {
  const { state, setAge, setStyle, setPreference, reset, back, input } = usePickerState();
  const [results, setResults] = useState<PickerResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePreference(pref: Parameters<typeof setPreference>[0]) {
    setPreference(pref);
    if (!input && state.age_group && state.game_style) {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch<PickerResult[]>("/api/picker/guided", {
          method: "POST",
          body: JSON.stringify({
            age_group: state.age_group,
            game_style: state.game_style,
            preference: pref,
          }),
        });
        setResults(data);
      } catch {
        setError("Failed to load recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  const stepLabels = ["Your Age", "Playing Style", "What You Need"];

  if (results) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">Your Top Recommendations</h1>
          <p className="text-ink-muted text-sm sm:text-base">
            Based on your answers, here are the best racquets for your game.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.map((result, i) => (
            <PickerResultCard key={result.racquet.id} result={result} rank={i + 1} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => { reset(); setResults(null); }}
            className="inline-flex items-center gap-2 text-brand-indigo font-semibold hover:text-brand-indigo-dark transition-colors py-2"
          >
            <FiRefreshCw />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Progress */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-start justify-between mb-4">
          {stepLabels.map((label, i) => {
            const step = i + 1;
            const isActive = state.step === step;
            const isDone = state.step > step;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                  isDone ? "bg-brand-indigo text-white"
                  : isActive ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/20"
                  : "bg-border-soft text-ink-muted"
                }`}>
                  {isDone ? "✓" : step}
                </div>
                <span className={`text-xs font-medium text-center ${isActive ? "text-brand-indigo" : "text-ink-muted"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-border-soft rounded-full h-1.5">
          <div
            className="bg-brand-indigo h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((state.step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {state.step > 1 && (
        <button
          onClick={back}
          className="flex items-center gap-1.5 text-ink-muted hover:text-ink text-sm mb-5 sm:mb-6 transition-colors py-1"
        >
          <FiArrowLeft />
          Back
        </button>
      )}

      {state.step === 1 && <AgeStep onSelect={setAge} />}
      {state.step === 2 && <StyleStep onSelect={setStyle} />}
      {state.step === 3 && !loading && <PreferenceStep onSelect={handlePreference} />}

      {loading && (
        <div className="text-center py-16 sm:py-20">
          <div className="inline-block w-10 h-10 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin mb-4" />
          <p className="text-ink-muted">Finding your perfect racquets…</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => setError(null)}
            className="text-brand-indigo font-semibold hover:text-brand-indigo-dark py-2">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
