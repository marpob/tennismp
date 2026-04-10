import { useState } from "react";
import { useLoaderData, useSearchParams, Form } from "react-router";
import type { Route } from "./+types/index";
import { apiFetch } from "~/lib/api";
import type { PaginatedResponse, TennisString } from "~/lib/types";
import ReviewCard from "~/components/ui/ReviewCard";
import { FiFilter, FiX } from "react-icons/fi";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "String Reviews — tennismp" },
    { name: "description", content: "In-depth tennis string reviews covering polyester, multifilament, natural gut, and more." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const qs = url.searchParams.toString();
  return apiFetch<PaginatedResponse<TennisString>>(`/api/strings${qs ? `?${qs}` : ""}`);
}

const MATERIALS = [
  "polyester",
  "multifilament",
  "natural_gut",
  "hybrid",
  "synthetic_gut",
  "kevlar",
];

function FilterPanel({ searchParams }: { searchParams: URLSearchParams }) {
  return (
    <Form method="get" className="space-y-5">
      <h2 className="font-semibold text-ink text-sm uppercase tracking-wider">Filters</h2>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Brand</label>
        <input name="brand" type="text" placeholder="e.g. Babolat"
          defaultValue={searchParams.get("brand") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Material</label>
        <select name="material" defaultValue={searchParams.get("material") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="">All types</option>
          {MATERIALS.map((m) => <option key={m} value={m}>{m.replace("_", " ")}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Gauge (mm)</label>
        <div className="flex gap-2">
          <input name="gauge_min" type="number" step="0.01" placeholder="Min"
            defaultValue={searchParams.get("gauge_min") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
          <input name="gauge_max" type="number" step="0.01" placeholder="Max"
            defaultValue={searchParams.get("gauge_max") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Sort by</label>
        <select name="sort" defaultValue={searchParams.get("sort") ?? "score"}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="score">Highest Score</option>
          <option value="name">Name A–Z</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit"
          className="flex-1 bg-brand-indigo text-white rounded-lg py-2.5 text-sm font-medium hover:bg-brand-indigo-dark transition-colors">
          Apply
        </button>
        <a href="/strings"
          className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-brand-indigo/30 transition-colors">
          Reset
        </a>
      </div>
    </Form>
  );
}

export default function StringsIndex() {
  const { data: strings, total } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-1">String Reviews</h1>
          <p className="text-ink-muted text-sm sm:text-base">
            {total} string{total !== 1 ? "s" : ""} reviewed
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-sm font-medium text-ink hover:border-brand-indigo/40 transition-colors"
        >
          {filtersOpen ? <FiX /> : <FiFilter />}
          Filters
        </button>
      </div>

      {filtersOpen && (
        <div className="lg:hidden bg-white rounded-2xl border border-border-soft p-5 mb-6">
          <FilterPanel searchParams={searchParams} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-border-soft p-5 sticky top-24">
            <FilterPanel searchParams={searchParams} />
          </div>
        </aside>

        <div className="flex-1">
          {strings.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">No strings match your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {strings.map((s) => (
                <ReviewCard key={s.id} item={s} href={`/strings/${s.slug}`} category="String" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
