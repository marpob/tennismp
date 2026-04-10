import { useLoaderData, useSearchParams } from "react-router";
import type { Route } from "./+types/index";
import { apiFetch } from "~/lib/api";
import type { PaginatedResponse, OtherItem } from "~/lib/types";
import { Link } from "react-router";
import ScoreBadge from "~/components/ui/ScoreBadge";
import TagPill from "~/components/ui/TagPill";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Gear Reviews — tennismp" },
    { name: "description", content: "Reviews of tennis books, balls, stringing machines, dampeners and other gear." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const qs = url.searchParams.toString();
  return apiFetch<PaginatedResponse<OtherItem>>(`/api/other${qs ? `?${qs}` : ""}`);
}

const CATEGORIES = [
  { value: "", label: "All Gear" },
  { value: "ball", label: "Balls" },
  { value: "book", label: "Books" },
  { value: "stringing_machine", label: "Machines" },
  { value: "dampener", label: "Dampeners" },
  { value: "bag", label: "Bags" },
  { value: "grip", label: "Grips" },
];

export default function OtherIndex() {
  const { data: items, total } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-1">Gear Reviews</h1>
        <p className="text-ink-muted text-sm sm:text-base">{total} item{total !== 1 ? "s" : ""} reviewed</p>
      </div>

      {/* Category tabs — scrollable on mobile */}
      <div className="overflow-x-auto mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {CATEGORIES.map(({ value, label }) => (
            <a
              key={value}
              href={value ? `/other?category=${value}` : "/other"}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === value
                  ? "bg-brand-indigo text-white"
                  : "bg-white border border-border-soft text-ink-muted hover:border-brand-indigo/30 hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-ink-muted">No items found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/other/${item.slug}`}
              className="group block bg-white rounded-2xl border border-border-soft shadow-sm hover:shadow-md hover:border-brand-indigo/30 transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center overflow-hidden">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="text-ink-light text-sm">No image</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <TagPill label={item.category.replace("_", " ")} variant="azure" />
                    <h3 className="font-semibold text-ink mt-1 group-hover:text-brand-indigo transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-ink-muted">{item.brand}</p>
                  </div>
                  {item.score_overall !== undefined && <ScoreBadge score={item.score_overall} />}
                </div>
                {item.review_summary && (
                  <p className="text-sm text-ink-muted line-clamp-2 mt-2">{item.review_summary}</p>
                )}
                {item.price_usd !== undefined && (
                  <p className="text-sm font-semibold text-ink mt-2">${item.price_usd}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
