import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import { toggleSave, isSaved } from "../utils/savedTrends";
import { hapticTap } from "../utils/haptics";
import PopularityRing from "./PopularityRing";

function cleanTitle(title) {
  if (!title) return "";
  return title.length > 95 ? title.slice(0, 92) + "…" : title;
}

export default function TrendCard({
  title,
  summary,
  image,
  slug,
  category,
  popularityScore,
  createdAt,
  platform,
  featured = false,
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
      className={`relative block bg-white rounded-xl border hover:shadow-lg transition overflow-hidden ${
        featured ? "md:flex md:min-h-[260px]" : ""
      }`}
    >
      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        aria-label="Save trend"
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full px-2 py-1 text-sm shadow hover:scale-105 transition"
      >
        {saved ? "⭐" : "☆"}
      </button>

      {/* IMAGE */}
      {image && (
        <div
          className={
            featured
              ? "w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-100"
              : "h-40 w-full overflow-hidden bg-gray-100"
          }
        >
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
      <div className={featured ? "p-6 md:w-1/2 flex flex-col" : "p-5"}>
        {/* CATEGORY + DATE */}
        <div className="text-xs text-gray-500 flex gap-2 items-center">
          <span className="uppercase tracking-wide text-orange-600 font-semibold">
            {category}
          </span>
          {createdAt && <span>· {formatDate(createdAt)}</span>}
        </div>

        {/* TITLE */}
        <h3
          className={`mt-2 font-extrabold text-gray-900 ${
            featured ? "text-2xl" : "text-base"
          } line-clamp-2`}
        >
          {cleanTitle(title)}
        </h3>

        {/* SUMMARY */}
        <p
          className={`mt-3 text-gray-600 ${
            featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
          }`}
        >
          {summary}
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex items-center">
          {/* Popularity (hide for NASA + featured optional) */}
          {platform !== "NASA" && !featured && (
            <PopularityRing score={popularityScore} size={44} />
          )}

          <span className="ml-auto text-orange-600 text-sm font-semibold">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
