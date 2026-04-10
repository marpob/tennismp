import { useLoaderData } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/$slug";
import { apiFetch } from "~/lib/api";
import type { Racquet } from "~/lib/types";
import RatingStars from "~/components/ui/RatingStars";
import RatingBar from "~/components/ui/RatingBar";
import ScoreBadge from "~/components/ui/ScoreBadge";
import ReviewSpecsTable from "~/components/reviews/ReviewSpecsTable";
import ProsConsList from "~/components/reviews/ProsConsList";
import TagPill from "~/components/ui/TagPill";
import { FiExternalLink } from "react-icons/fi";

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData?.racquet) return [{ title: "Racquet Not Found — tennismp" }];
  const r = loaderData.racquet as Racquet;
  return [
    { title: `${r.name} Review — tennismp` },
    { name: "description", content: r.review_summary ?? `Read our full review of the ${r.name}.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const racquet = await apiFetch<Racquet | null>(`/api/racquets/${params.slug}`).catch(() => null);
  if (!racquet) throw data("Not found", { status: 404 });
  return { racquet };
}

export default function RacquetDetail() {
  const { racquet: r } = useLoaderData<typeof loader>();

  const scores = [
    { label: "Power", value: r.score_power },
    { label: "Control", value: r.score_control },
    { label: "Spin", value: r.score_spin },
    { label: "Comfort", value: r.score_comfort },
    { label: "Maneuverability", value: r.score_maneuverability },
  ].filter((s): s is { label: string; value: number } => s.value !== undefined);

  const specs = [
    { label: "Brand", value: r.brand },
    { label: "Year", value: r.year },
    { label: "Weight (unstrung)", value: r.weight_g ? `${r.weight_g}g` : undefined },
    { label: "Head Size", value: r.head_size_sq_in ? `${r.head_size_sq_in} sq in` : undefined },
    { label: "Length", value: r.length_in ? `${r.length_in}"` : undefined },
    { label: "Balance", value: r.balance_mm ? `${r.balance_mm}mm (${r.balance_type?.replace("_", " ")})` : undefined },
    { label: "Swingweight", value: r.swingweight },
    { label: "Stiffness (RA)", value: r.stiffness_ra },
    { label: "Beam Width", value: r.beam_width_mm },
    { label: "String Pattern", value: r.string_pattern },
    { label: "Swing Speed", value: r.recommended_swing_speed },
    { label: "Skill Level", value: r.skill_level },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-muted mb-5 sm:mb-6">
        <a href="/racquets" className="hover:text-brand-indigo">Racquets</a>
        <span className="mx-2">/</span>
        <span className="text-ink line-clamp-1">{r.name}</span>
      </nav>

      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-12">
        <div className="bg-surface-alt rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-border-soft min-h-52 sm:min-h-64">
          {r.image_url ? (
            <img src={r.image_url} alt={r.name} className="max-h-64 sm:max-h-80 object-contain" />
          ) : (
            <div className="text-ink-light text-sm">No image available</div>
          )}
        </div>

        <div>
          <p className="text-brand-magenta font-semibold text-sm uppercase tracking-wider mb-1">{r.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-3">{r.name}</h1>

          {r.score_overall !== undefined && (
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ScoreBadge score={r.score_overall} size="lg" />
              <RatingStars score={r.score_overall} size="lg" />
              <span className="text-ink-muted text-sm">Overall Score</span>
            </div>
          )}

          {r.review_summary && (
            <p className="text-ink-muted leading-relaxed mb-5 text-sm sm:text-base">{r.review_summary}</p>
          )}

          {r.player_type && r.player_type.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {r.player_type.map((t) => (
                <TagPill key={t} label={t.replace("_", " ")} variant="indigo" />
              ))}
            </div>
          )}

          {r.affiliate_url && (
            <a href={r.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-indigo text-white font-semibold px-5 sm:px-6 py-2.5 rounded-xl hover:bg-brand-indigo-dark transition-colors">
              Check Price <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {scores.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Performance Scores</h2>
          <div className="bg-white rounded-2xl border border-border-soft p-4 sm:p-6 space-y-4">
            {scores.map((s) => <RatingBar key={s.label} label={s.label} value={s.value} />)}
          </div>
        </section>
      )}

      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Specifications</h2>
        <ReviewSpecsTable specs={specs} />
      </section>

      {(r.pros?.length || r.cons?.length) && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Pros & Cons</h2>
          <ProsConsList pros={r.pros} cons={r.cons} />
        </section>
      )}

      {r.review_body && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Full Review</h2>
          <div className="prose prose-neutral max-w-none text-ink-muted leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: r.review_body }} />
        </section>
      )}
    </div>
  );
}
