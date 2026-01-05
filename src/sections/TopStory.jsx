import { Link } from "react-router-dom";

export default function TopStory({ items = [] }) {
  const first = items?.[0];
  if (!first || !first.slug) return null;

  return (
    <section className="space-y-6">
      <Link to={`/trend/${first.slug}`} className="group block">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-black">
          {first.image && (
            <img
              src={first.image}
              alt={first.title}
              fetchpriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold group-hover:text-orange-500 transition">
          {first.title}
        </h1>

        {first.summary && (
          <p className="text-gray-600 mt-2 line-clamp-2">{first.summary}</p>
        )}
      </Link>
    </section>
  );
}
