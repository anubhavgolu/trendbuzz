import { Link } from "react-router-dom";

export default function VideoSection({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Videos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          if (!item?.slug) return null;

          return (
            <Link
              key={item._id}
              to={`/trend/${item.slug}`}
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                )}

                <span className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                  ▶
                </span>
              </div>

              <h3 className="mt-2 font-semibold line-clamp-2 group-hover:text-orange-600 transition">
                {item.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
