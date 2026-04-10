import type { Preference } from "~/lib/types";

interface Props {
  onSelect: (pref: Preference) => void;
}

const options: { value: Preference; label: string; description: string; emoji: string }[] = [
  {
    value: "more_control",
    label: "More Control",
    description: "Precision placement — you want to know exactly where the ball goes",
    emoji: "🎯",
  },
  {
    value: "more_power",
    label: "More Power",
    description: "Bigger shots with less effort from the frame",
    emoji: "💪",
  },
  {
    value: "more_spin",
    label: "More Spin",
    description: "Heavy topspin or slice — dip and kick",
    emoji: "🌀",
  },
  {
    value: "more_speed",
    label: "More Speed",
    description: "Lighter, faster — easy to swing quickly",
    emoji: "⚡",
  },
  {
    value: "balance",
    label: "Best All-Round",
    description: "Balanced across all performance metrics",
    emoji: "⚖️",
  },
];

export default function PreferenceStep({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">
        What are you looking for?
      </h2>
      <p className="text-ink-muted mb-6 sm:mb-8 text-sm sm:text-base">
        Pick the quality that matters most to you right now.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map(({ value, label, description, emoji }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="group text-left bg-white rounded-2xl border-2 border-border-soft p-4 sm:p-5 hover:border-brand-indigo hover:shadow-md transition-all active:scale-95"
          >
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{emoji}</div>
            <div className="font-bold text-ink mb-1 text-sm sm:text-base">{label}</div>
            <div className="text-ink-muted text-xs sm:text-sm leading-relaxed">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
