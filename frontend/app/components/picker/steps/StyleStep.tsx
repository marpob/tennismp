import type { GameStyle } from "~/lib/types";

interface Props {
  onSelect: (style: GameStyle) => void;
}

const options: { value: GameStyle; label: string; description: string; emoji: string }[] = [
  {
    value: "baseliner",
    label: "Baseliner",
    description: "Consistent groundstrokes with control and spin",
    emoji: "📍",
  },
  {
    value: "aggressive_baseliner",
    label: "Aggressive Baseliner",
    description: "Powerful heavy shots — you like to dictate play",
    emoji: "💥",
  },
  {
    value: "all_court",
    label: "All-Court",
    description: "Comfortable anywhere on the court",
    emoji: "🎯",
  },
  {
    value: "serve_and_volley",
    label: "Serve & Volley",
    description: "Love coming to the net — precision matters most",
    emoji: "⚡",
  },
  {
    value: "defensive",
    label: "Defensive",
    description: "Great retriever — redirect pace and rely on consistency",
    emoji: "🛡️",
  },
];

export default function StyleStep({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">What's your playing style?</h2>
      <p className="text-ink-muted mb-6 sm:mb-8 text-sm sm:text-base">
        Choose the style that best describes how you play most points.
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
