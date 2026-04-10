import { Link } from "react-router";
import type { PickerResult } from "~/lib/types";
import ScoreBadge from "~/components/ui/ScoreBadge";
import RatingStars from "~/components/ui/RatingStars";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";

interface Props {
  result: PickerResult;
  rank: number;
}

export default function PickerResultCard({ result, rank }: Props) {
  const { racquet: r, score, match_reasons } = result;

  const medalColors = [
    "bg-brand-gold text-white",
    "bg-gray-400 text-white",
    "bg-amber-700 text-white",
  ];
  const medalClass = medalColors[rank - 1] ?? "bg-surface-alt text-ink-muted";

  return (
    <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
      {/* Top bar: rank + name + match % */}
      <div className={`flex items-center gap-3 px-4 py-3 ${medalClass}`}>
        <span className="text-lg font-bold">#{rank}</span>
        <span className="font-semibold flex-1 text-sm sm:text-base">{r.brand} {r.model || r.name}</span>
        <span className="text-sm font-bold opacity-90">{score}% match</span>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-32 bg-surface-alt flex items-center justify-center p-4 shrink-0 min-h-24">
          {r.image_url ? (
            <img src={r.image_url} alt={r.name} className="max-h-24 object-contain" />
          ) : (
            <div className="text-ink-light text-xs text-center">No image</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <h3 className="font-bold text-ink text-base mb-2">{r.name}</h3>

          {r.score_overall !== undefined && (
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <ScoreBadge score={r.score_overall} size="sm" />
              <RatingStars score={r.score_overall} size="sm" />
              <span className="text-xs text-ink-muted">review score</span>
            </div>
          )}

          <ul className="space-y-1 mb-4">
            {match_reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-ink-muted">
                <FiCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link to={`/racquets/${r.slug}`}
              className="text-sm font-semibold text-brand-indigo hover:text-brand-indigo-dark transition-colors">
              Read Review
            </Link>
            {r.affiliate_url && (
              <a href={r.affiliate_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink-muted hover:text-ink transition-colors">
                Check Price <FiExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
