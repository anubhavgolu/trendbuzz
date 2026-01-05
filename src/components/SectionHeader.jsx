import { Link } from "react-router-dom";

export default function SectionHeader({ title }) {
  if (!title) return null;

  const displayTitle =
    title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="flex items-center justify-between gap-4">
      {/* LEFT: TITLE */}
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
        {displayTitle}
      </h2>

      {/* CENTER LINE */}
      <span className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-orange-500/40 to-transparent" />

      {/* RIGHT: VIEW ALL */}
      <Link
        to={`/category/${title}`}
        className="text-sm font-medium text-orange-600 hover:underline whitespace-nowrap"
      >
        View all →
      </Link>
    </div>
  );
}
