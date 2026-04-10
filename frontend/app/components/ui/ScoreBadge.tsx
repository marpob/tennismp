import { scoreBg } from "~/lib/utils";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function ScoreBadge({ score, size = "md" }: Props) {
  const rounded = Math.round(score * 10) / 10;
  const cls = scoreBg(score);
  const sizeCls =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
        ? "text-2xl px-4 py-2 font-bold"
        : "text-sm px-3 py-1 font-semibold";

  return (
    <span className={`rounded-full ${cls} ${sizeCls}`}>
      {rounded.toFixed(1)}
    </span>
  );
}
