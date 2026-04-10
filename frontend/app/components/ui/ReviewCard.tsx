import { Link } from "react-router";
import type { Racquet, TennisString } from "~/lib/types";
import RatingStars from "./RatingStars";
import ScoreBadge from "./ScoreBadge";

type ReviewItem = Racquet | TennisString;

interface Props {
  item: ReviewItem;
  href: string;
  category: string;
}

export default function ReviewCard({ item, href, category }: Props) {
  const score = item.score_overall;

  return (
    <Link
      to={href}
      className="group block bg-white rounded-2xl border border-border-soft shadow-sm hover:shadow-md hover:border-brand-indigo/30 transition-all overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-ink-light text-sm">No image</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-xs text-ink-muted font-medium uppercase tracking-wider mb-0.5">
              {category} · {item.brand}
            </p>
            <h3 className="text-ink font-semibold text-base leading-snug group-hover:text-brand-indigo transition-colors">
              {item.name}
            </h3>
          </div>
          {score !== undefined && <ScoreBadge score={score} />}
        </div>

        {score !== undefined && (
          <div className="mt-2">
            <RatingStars score={score} size="sm" />
          </div>
        )}

        {item.review_summary && (
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 leading-relaxed">
            {item.review_summary}
          </p>
        )}
      </div>
    </Link>
  );
}
