import { useLoaderData } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/$slug";
import { apiFetch } from "~/lib/api";
import type { OtherItem } from "~/lib/types";
import ScoreBadge from "~/components/ui/ScoreBadge";
import RatingStars from "~/components/ui/RatingStars";
import ProsConsList from "~/components/reviews/ProsConsList";
import TagPill from "~/components/ui/TagPill";
import { FiExternalLink } from "react-icons/fi";

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData?.item) return [{ title: "Item Not Found — tennismp" }];
  const item = loaderData.item as OtherItem;
  return [
    { title: `${item.name} Review — tennismp` },
    { name: "description", content: item.review_summary ?? `Read our full review of the ${item.name}.` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const item = await apiFetch<OtherItem | null>(`/api/other/${params.slug}`).catch(() => null);
  if (!item) throw data("Not found", { status: 404 });
  return { item };
}

export default function OtherItemDetail() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-ink-muted mb-5 sm:mb-6">
        <a href="/other" className="hover:text-brand-indigo">Gear</a>
        <span className="mx-2">/</span>
        <span className="text-ink line-clamp-1">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-12">
        <div className="bg-surface-alt rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-border-soft min-h-52 sm:min-h-64">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="max-h-64 sm:max-h-80 object-contain" />
          ) : (
            <div className="text-ink-light text-sm">No image available</div>
          )}
        </div>

        <div>
          <div className="mb-2">
            <TagPill label={item.category.replace("_", " ")} variant="azure" />
          </div>
          <p className="text-brand-magenta font-semibold text-sm uppercase tracking-wider mt-2 mb-1">{item.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-3">{item.name}</h1>

          {item.score_overall !== undefined && (
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ScoreBadge score={item.score_overall} size="lg" />
              <RatingStars score={item.score_overall} size="lg" />
              <span className="text-ink-muted text-sm">Overall Score</span>
            </div>
          )}

          {item.price_usd !== undefined && (
            <p className="text-2xl font-bold text-ink mb-4">${item.price_usd}</p>
          )}

          {item.review_summary && (
            <p className="text-ink-muted leading-relaxed mb-5 text-sm sm:text-base">{item.review_summary}</p>
          )}

          {item.affiliate_url && (
            <a href={item.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-azure text-white font-semibold px-5 sm:px-6 py-2.5 rounded-xl hover:bg-brand-azure-dark transition-colors">
              Check Price <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {(item.pros?.length || item.cons?.length) && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Pros & Cons</h2>
          <ProsConsList pros={item.pros} cons={item.cons} />
        </section>
      )}

      {item.review_body && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 sm:mb-5">Full Review</h2>
          <div className="prose prose-neutral max-w-none text-ink-muted leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: item.review_body }} />
        </section>
      )}
    </div>
  );
}
