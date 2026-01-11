import { Link } from "react-router-dom";

export default function TopStory({ items = [] }) {
  const first = items?.[0];
  if (!first || !first.slug) return null;

  return (
    <section className="space-y-6">
      <Link to={`/trend/${first.slug}`} className="group block">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-900">
          {first.image && (
            <img
              src={first.image} // fallback
              srcSet={`
                ${first.image}?w=640 640w,
                ${first.image}?w=1024 1024w,
                ${first.image}?w=1600 1600w
              `}
              sizes="(max-width: 768px) 100vw, 1024px"
              width="1024"
              height="576"
              alt={first.title}
              fetchpriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <h2 className="mt-4 text-2xl md:text-3xl font-extrabold group-hover:text-orange-500 transition">
          {first.title}
        </h2>

        {first.summary && (
          <p className="text-gray-600 mt-2 line-clamp-2">
            {first.summary}
          </p>
        )}
      </Link>
    </section>
  );
}
