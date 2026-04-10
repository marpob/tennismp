import { useLoaderData } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/$slug";
import { apiFetch } from "~/lib/api";
import type { TennisString } from "~/lib/types";
import RatingStars from "~/components/ui/RatingStars";
import RatingBar from "~/components/ui/RatingBar";
import ScoreBadge from "~/components/ui/ScoreBadge";
import ReviewSpecsTable from "~/components/reviews/ReviewSpecsTable";
import ProsConsList from "~/components/reviews/ProsConsList";
import TagPill from "~/components/ui/TagPill";
import { FiExternalLink } from "react-icons/fi";

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData?.string) return [{ title: "String Not Found — tennismp" }];
  const s = loaderData.string as TennisString;
  return [
    { title: `${s.name} Review — tennismp` },
    { name: "description", content: s.review_summary ?? `Read our full review of the ${s.name}.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const str = await apiFetch<TennisString | null>(`/api/strings/${params.slug}`).catch(() => null);
  if (!str) throw data("Not found", { status: 404 });
  return { string: str };
}

export default function StringDetail() {
  const { string: s } = useLoaderData<typeof loader>();

  const scores = [
    { label: "Power", value: s.score_power },
    { label: "Control", value: s.score_control },
    { label: "Spin", value: s.score_spin },
    { label: "Comfort", value: s.score_comfort },
    { label: "Durability", value: s.score_durability },
  ].filter((sc): sc is { label: string; value: number } => sc.value !== undefined);

  const specs = [
    { label: "Brand", value: s.brand },
    { label: "Gauge", value: s.gauge_label ? `${s.gauge_label} (${s.gauge_mm}mm)` : s.gauge_mm ? `${s.gauge_mm}mm` : undefined },
    { label: "Material", value: s.material?.replace("_", " ") },
    { label: "Construction", value: s.construction },
    { label: "Tension Range", value: s.tension_min_lb && s.tension_max_lb ? `${s.tension_min_lb}–${s.tension_max_lb} lbs` : undefined },
    { label: "Price", value: s.price_usd ? `$${s.price_usd}` : undefined },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-ink-muted mb-5 sm:mb-6">
        <a href="/strings" className="hover:text-brand-indigo">Strings</a>
        <span className="mx-2">/</span>
        <span className="text-ink line-clamp-1">{s.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-12">
        <div className="bg-surface-alt rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-border-soft min-h-52 sm:min-h-64">
          {s.image_url ? (
            <img src={s.image_url} alt={s.name} className="max-h-64 sm:max-h-80 object-contain" />
          ) : (
            <div className="text-ink-light text-sm">No image available</div>
          )}
        </div>

        <div>
          <p className="text-brand-magenta font-semibold text-sm uppercase tracking-wider mb-1">{s.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-3">{s.name}</h1>

          {s.score_overall !== undefined && (
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ScoreBadge score={s.score_overall} size="lg" />
              <RatingStars score={s.score_overall} size="lg" />
              <span className="text-ink-muted text-sm">Overall Score</span>
            </div>
          )}

          {s.material && (
            <div className="mb-4">
              <TagPill label={s.material.replace("_", " ")} variant="magenta" />
            </div>
          )}

          {s.review_summary && (
            <p className="text-ink-muted leading-relaxed mb-5 text-sm sm:text-base">{s.review_summary}</p>
          )}

          {s.affiliate_url && (
            <a href={s.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-magenta text-white font-semibold px-5 sm:px-6 py-2.5 rounded-xl hover:bg-brand-magenta-dark transition-colors">
              Check Price <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {scores.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Performance Scores</h2>
          <div className="bg-white rounded-2xl border border-border-soft p-4 sm:p-6 space-y-4">
            {scores.map((sc) => <RatingBar key={sc.label} label={sc.label} value={sc.value} />)}
          </div>
        </section>
      )}

      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Specifications</h2>
        <ReviewSpecsTable specs={specs} />
      </section>

      {(s.pros?.length || s.cons?.length) && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Pros & Cons</h2>
          <ProsConsList pros={s.pros} cons={s.cons} />
        </section>
      )}

      {s.review_body && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Full Review</h2>
          <div className="prose prose-neutral max-w-none text-ink-muted leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: s.review_body }} />
        </section>
      )}
    </div>
  );
}
