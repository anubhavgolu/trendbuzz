import { Link } from "react-router-dom";
import { API_BASE } from "../services/http";

export default function ContentCard({
  title,
  summary,
  image,
  slug,
  sourceName,
  publishedAt,
}) {
  if (!slug) return null;

  const imageUrl = image?.startsWith("http")
    ? image
    : image
    ? `${API_BASE}${image}`
    : "/fallback.jpg";

  return (
    <Link
      to={`/trend/${slug}`}
      aria-label={title || "Article"}
      className="group bg-white rounded-xl border hover:shadow-lg transition overflow-hidden flex flex-col"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={title || "Article"}
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base leading-snug line-clamp-2">
          {title}
        </h3>

        {summary ? (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{summary}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            Read full guide inside.
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {sourceName ? `By ${sourceName}` : ""}
            {publishedAt ? ` • ${new Date(publishedAt).toLocaleDateString()}` : ""}
          </span>

          <span className="text-sm font-semibold text-orange-600 group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
