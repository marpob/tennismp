import { useLoaderData, useSearchParams } from "react-router";
import type { Route } from "./+types/index";
import { apiFetch } from "~/lib/api";
import type { PaginatedResponse, BlogPost } from "~/lib/types";
import BlogCard from "~/components/ui/BlogCard";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Blog — tennismp" },
    { name: "description", content: "Tennis tips, gear guides, technique articles, and news from tennismp." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const qs = url.searchParams.toString();
  return apiFetch<PaginatedResponse<BlogPost>>(`/api/blog${qs ? `?${qs}` : ""}`);
}

const BLOG_CATEGORIES = [
  { value: "", label: "All Posts" },
  { value: "gear", label: "Gear" },
  { value: "tips", label: "Tips" },
  { value: "technique", label: "Technique" },
  { value: "news", label: "News" },
];

export default function BlogIndex() {
  const { data: posts, total } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-1">Blog</h1>
        <p className="text-ink-muted text-sm sm:text-base">{total} post{total !== 1 ? "s" : ""}</p>
      </div>

      {/* Category tabs — scrollable on mobile */}
      <div className="overflow-x-auto mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {BLOG_CATEGORIES.map(({ value, label }) => (
            <a
              key={value}
              href={value ? `/blog?category=${value}` : "/blog"}
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

      {posts.length === 0 ? (
        <div className="text-center py-20 text-ink-muted">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
