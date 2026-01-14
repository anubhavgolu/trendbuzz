import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function TopStory({ items = [] }) {
  const first = items?.[0];
  if (!first || !first.slug) return null;

  const imageUrl = first.image
    ? first.image.startsWith("http")
      ? first.image
      : `${API_BASE}${first.image}`
    : null;

  return (
    <section className="space-y-6">
      <Link to={`/trend/${first.slug}`} className="group block">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-900">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={first.title}
              width="1024"
              height="576"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 1024px"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/fallback.jpg";
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <h2 className="mt-4 text-2xl md:text-3xl font-extrabold group-hover:text-orange-500 transition">
          {first.title}
        </h2>

        {first.summary && (
          <p className="text-gray-600 mt-2 line-clamp-2">{first.summary}</p>
        )}
      </Link>
    </section>
  );
}
