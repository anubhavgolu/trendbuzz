import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import { toggleSave, isSaved } from "../utils/savedTrends";
import { hapticTap } from "../utils/haptics";
import PopularityRing from "./PopularityRing";

export default function TrendCard({
  title,
  summary,
  image,
  slug,
  category,
  popularityScore,
  createdAt,
  platform,
}) {
  const [saved, setSaved] = useState(isSaved(slug));

  function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    hapticTap();
    toggleSave({
      title,
      summary,
      image,
      slug,
      category,
      popularityScore,
      createdAt,
    });
    setSaved((v) => !v);
  }

  return (
    <Link
      to={`/trend/${slug}`}
      className="relative block bg-white rounded-xl border hover:shadow-lg transition overflow-hidden"
    >
      <button
        onClick={handleSave}
        aria-label="Save trend"
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full px-2 py-1 text-sm shadow hover:scale-105 transition"
      >
        {saved ? "⭐" : "☆"}
      </button>

      {/* IMAGE PREVIEW */}
      {image && (
        <div className="h-40 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY + DATE */}
        <div className="text-xs text-gray-500 flex gap-2 items-center">
          <span className="uppercase tracking-wide text-orange-600 font-semibold">
            {category}
          </span>
          {createdAt && <span>· {formatDate(createdAt)}</span>}
        </div>

        <h3 className="mt-2 font-bold text-gray-900 line-clamp-2">{title}</h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{summary}</p>

        <div className="mt-4 pt-3 border-t flex items-center">
          {/* Left side (Popularity or empty space) */}
          {platform !== "NASA" && (
            <PopularityRing score={popularityScore} size={44} />
          )}

          {/* Push View to right always */}
          <span className="ml-auto text-orange-600 text-sm font-semibold cursor-pointer">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
