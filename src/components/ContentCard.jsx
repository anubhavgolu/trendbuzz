import { Link } from "react-router-dom";

export default function ContentCard({
  title,
  summary,
  image,
  slug,
  sourceName,
}) {
  return (
    <Link
      to={`/trend/${slug}`}
      className="group bg-white rounded-xl border hover:shadow-lg transition overflow-hidden flex flex-col"
    >
      {image && (
        <div className="aspect-[16/9] bg-gray-100 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "/fallback.jpg";
            }}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
  
        <h3 className="font-bold text-base leading-snug line-clamp-2">
          {title}
        </h3>

        {summary && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {summary}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          {sourceName ? (
            <span className="text-xs text-gray-400">
              Source: {sourceName}
            </span>
          ) : (
            <span />
          )}

          <span className="text-sm font-semibold text-orange-600 group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
