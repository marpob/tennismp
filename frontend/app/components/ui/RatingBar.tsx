interface Props {
  label: string;
  value: number; // 1-10
}

export default function RatingBar({ label, value }: Props) {
  const pct = (value / 10) * 100;
  const color =
    value >= 8
      ? "bg-green-500"
      : value >= 6
        ? "bg-brand-azure"
        : value >= 4
          ? "bg-amber-400"
          : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-muted w-20 sm:w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-border-soft rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-ink w-8 text-right">{value}/10</span>
    </div>
  );
}
