import { Link } from "react-router-dom";

export default function ContentCard({
  title,
  summary,
  image,
  slug,
  sourceName,
  keywords,
}) {
  return (
    <Link
      to={`/${slug}`}
      className="bg-white rounded-xl border hover:shadow-lg transition"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-t-xl"
        />
      )}

      <div className="p-4">
        <h3 className="font-bold line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {summary}
        </p>

        {sourceName && (
          <p className="mt-3 text-xs text-gray-400">
            Via {sourceName}
          </p>
        )}
      </div>
    </Link>
  );
}
