import { getSpotlightTrend } from "../utils/getSpotlightTrend";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

export default function Spotlight({ trends }) {
  const spotlight = getSpotlightTrend(trends);

  if (!spotlight) return null;

  return (
    <section className="mb-14">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
         News of the Day
      </h2>

      <Link to={`/trend/${spotlight.slug}`}>
        <div className="relative rounded-2xl overflow-hidden">
          {spotlight.image && (
            <img
              src={spotlight.image}
              alt={spotlight.title}
              loading="eager"
              fetchpriority="high"
              className="w-full h-80 object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-0 p-6 text-white">
            <p className="text-sm opacity-90 mb-2">
              {spotlight.category.toUpperCase()} ·{" "}
              {formatDate(spotlight.createdAt)}
            </p>

            <h3 className="text-2xl font-bold">{spotlight.title}</h3>
          </div>
        </div>
      </Link>
    </section>
  );
}
