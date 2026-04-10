import { useLoaderData } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/$slug";
import { apiFetch } from "~/lib/api";
import type { BlogPost } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import TagPill from "~/components/ui/TagPill";

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData?.post) return [{ title: "Post Not Found — tennismp" }];
  const post = loaderData.post as BlogPost;
  return [
    { title: `${post.title} — tennismp` },
    { name: "description", content: post.excerpt ?? "" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await apiFetch<BlogPost | null>(`/api/blog/${params.slug}`).catch(() => null);
  if (!post) throw data("Not found", { status: 404 });
  return { post };
}

export default function BlogPostDetail() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-ink-muted mb-5 sm:mb-6">
        <a href="/blog" className="hover:text-brand-indigo">Blog</a>
        <span className="mx-2">/</span>
        <span className="text-ink line-clamp-1">{post.title}</span>
      </nav>

      {post.cover_image_url && (
        <div className="rounded-2xl overflow-hidden mb-6 sm:mb-8 aspect-[16/9]">
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {post.category && (
        <div className="mb-3">
          <TagPill label={post.category} variant="indigo" />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink mb-4 leading-tight">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-ink-muted mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border-soft">
        <span className="font-medium text-ink">{post.author}</span>
        {post.published_at && (
          <>
            <span>·</span>
            <span>{formatDate(post.published_at)}</span>
          </>
        )}
        {post.read_time_min && (
          <>
            <span>·</span>
            <span>{post.read_time_min} min read</span>
          </>
        )}
      </div>

      {post.body && (
        <div className="prose prose-neutral max-w-none text-ink leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: post.body }} />
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 sm:mt-10 pt-6 border-t border-border-soft flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <a key={tag} href={`/blog?tag=${tag}`}>
              <TagPill label={`#${tag}`} variant="neutral" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
