import { Link } from "react-router-dom";

export default function SectionHeader({ title, showViewAll = true }) {
  if (!title) return null;

  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const slug = title.toLowerCase().trim().replace(/\s+/g, "-");

  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
        {displayTitle}
      </h2>

      <span className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-orange-500/40 to-transparent" />

      {showViewAll && (
        <Link
          to={`/category/${slug}`}
          className="text-sm font-medium text-orange-600 hover:underline whitespace-nowrap"
        >
          View all →
        </Link>
      )}
    </div>
  );
}
