import { useState } from "react";
import { useLoaderData, useSearchParams, Form } from "react-router";
import type { Route } from "./+types/index";
import { apiFetch } from "~/lib/api";
import type { PaginatedResponse, Racquet } from "~/lib/types";
import ReviewCard from "~/components/ui/ReviewCard";
import { FiFilter, FiX } from "react-icons/fi";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Racquet Reviews — tennismp" },
    { name: "description", content: "In-depth tennis racquet reviews with specs, performance scores, and expert analysis." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const qs = url.searchParams.toString();
  const [data, brands] = await Promise.all([
    apiFetch<PaginatedResponse<Racquet>>(`/api/racquets${qs ? `?${qs}` : ""}`),
    apiFetch<string[]>("/api/racquets/brands"),
  ]);
  return { ...data, brands };
}

const BALANCE_OPTIONS = ["head_heavy", "head_light", "even"];
const SWING_SPEED_OPTIONS = ["slow", "medium", "fast"];
const STRING_PATTERNS = ["16x19", "16x20", "18x20", "16x18", "18x19"];

function FilterPanel({ brands, searchParams }: { brands: string[]; searchParams: URLSearchParams }) {
  return (
    <Form method="get" className="space-y-5">
      <h2 className="font-semibold text-ink text-sm uppercase tracking-wider">Filters</h2>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Brand</label>
        <select name="brand" defaultValue={searchParams.get("brand") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="">All brands</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Weight (g)</label>
        <div className="flex gap-2">
          <input name="weight_min" type="number" placeholder="Min" defaultValue={searchParams.get("weight_min") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
          <input name="weight_max" type="number" placeholder="Max" defaultValue={searchParams.get("weight_max") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Head Size (sq in)</label>
        <div className="flex gap-2">
          <input name="head_size_min" type="number" placeholder="Min" defaultValue={searchParams.get("head_size_min") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
          <input name="head_size_max" type="number" placeholder="Max" defaultValue={searchParams.get("head_size_max") ?? ""}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm focus:outline-none focus:border-brand-indigo" />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Balance</label>
        <select name="balance_type" defaultValue={searchParams.get("balance_type") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="">Any</option>
          {BALANCE_OPTIONS.map((b) => <option key={b} value={b}>{b.replace("_", " ")}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Swing Speed</label>
        <select name="swing_speed" defaultValue={searchParams.get("swing_speed") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="">Any</option>
          {SWING_SPEED_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">String Pattern</label>
        <select name="string_pattern" defaultValue={searchParams.get("string_pattern") ?? ""}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="">Any</option>
          {STRING_PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted mb-1.5 block">Sort by</label>
        <select name="sort" defaultValue={searchParams.get("sort") ?? "score"}
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:border-brand-indigo">
          <option value="score">Highest Score</option>
          <option value="name">Name A–Z</option>
          <option value="weight">Lightest First</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit"
          className="flex-1 bg-brand-indigo text-white rounded-lg py-2.5 text-sm font-medium hover:bg-brand-indigo-dark transition-colors">
          Apply
        </button>
        <a href="/racquets"
          className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-brand-indigo/30 transition-colors">
          Reset
        </a>
      </div>
    </Form>
  );
}

export default function RacquetsIndex() {
  const { data: racquets, total, brands } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-1">Racquet Reviews</h1>
          <p className="text-ink-muted text-sm sm:text-base">
            {total} racquet{total !== 1 ? "s" : ""} reviewed
          </p>
        </div>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-sm font-medium text-ink hover:border-brand-indigo/40 transition-colors"
        >
          {filtersOpen ? <FiX /> : <FiFilter />}
          Filters
        </button>
      </div>

      {/* Mobile filter panel */}
      {filtersOpen && (
        <div className="lg:hidden bg-white rounded-2xl border border-border-soft p-5 mb-6">
          <FilterPanel brands={brands} searchParams={searchParams} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-border-soft p-5 sticky top-24">
            <FilterPanel brands={brands} searchParams={searchParams} />
          </div>
        </aside>

        {/* Results grid */}
        <div className="flex-1">
          {racquets.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              No racquets match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {racquets.map((r) => (
                <ReviewCard key={r.id} item={r} href={`/racquets/${r.slug}`} category="Racquet" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
