import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  score: number; // 0-10
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({ score, size = "md" }: Props) {
  // Convert 0-10 to 0-5 scale
  const stars = score / 2;
  const full = Math.floor(stars);
  const half = stars - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const sz = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

  return (
    <div className={`flex items-center gap-0.5 text-brand-gold ${sz}`}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f-${i}`} />
      ))}
      {half === 1 && <FaStarHalfAlt />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e-${i}`} className="text-brand-gold/40" />
      ))}
    </div>
  );
}
