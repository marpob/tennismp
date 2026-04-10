import { Link } from "react-router";
import type { BlogPost } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import TagPill from "./TagPill";

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-border-soft shadow-sm hover:shadow-md hover:border-brand-indigo/30 transition-all overflow-hidden"
    >
      {/* Cover image */}
      {post.cover_image_url && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {post.category && (
          <div className="mb-2">
            <TagPill label={post.category} variant="indigo" />
          </div>
        )}

        <h3 className="font-semibold text-ink text-lg leading-snug group-hover:text-brand-indigo transition-colors mb-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed mb-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-ink-light">
          <span>{post.author}</span>
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
      </div>
    </Link>
  );
}
