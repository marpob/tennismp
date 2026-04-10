import type { AgeGroup } from "~/lib/types";

interface Props {
  onSelect: (age: AgeGroup) => void;
}

const options: { value: AgeGroup; label: string; description: string; emoji: string }[] = [
  { value: "junior", label: "Junior", description: "Under 16 years old", emoji: "🧒" },
  { value: "adult", label: "Adult", description: "16 to 50 years old", emoji: "🎾" },
  { value: "senior", label: "Senior", description: "Over 50 years old", emoji: "👴" },
];

export default function AgeStep({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">How old are you?</h2>
      <p className="text-ink-muted mb-6 sm:mb-8 text-sm sm:text-base">
        Your age group helps us recommend the right weight and flexibility.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {options.map(({ value, label, description, emoji }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="group text-left bg-white rounded-2xl border-2 border-border-soft p-5 sm:p-6 hover:border-brand-indigo hover:shadow-md transition-all active:scale-95"
          >
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{emoji}</div>
            <div className="font-bold text-ink text-base sm:text-lg mb-1">{label}</div>
            <div className="text-ink-muted text-sm">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
