import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrends } from "../services/api";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { formatDate } from "../utils/formatDate";
import CommentsSidebar from "../sections/CommentsSidebar.jsx";
import NewsSchema from "../components/NewsSchema";
import SEO from "../components/SEO.jsx";
import author from "../data/author";

export default function TrendDetail() {
  const { slug } = useParams();
  const [trend, setTrend] = useState(null);

  useEffect(() => {
    async function loadTrend() {
      const data = await fetchTrends();
      const found = data.find((t) => t.slug === slug);
      setTrend(found);
    }
    loadTrend();
  }, [slug]);

  if (!trend) {
    return <p className="p-10 text-gray-500">Loading article…</p>;
  }

  const imageUrl = trend.image?.startsWith("http")
    ? trend.image
    : `https://www.trendbuzzs.com${trend.image}`;

  const hideComments = trend.platform !== "Reddit";

  return (
    <>
      <SEO
        title={`${trend.title} | TrendBuzzs`}
        description={trend.summary}
        keywords={trend.keywords?.combined?.join(", ")}
        canonical={`https://www.trendbuzzs.com/trend/${trend.slug}`}
      />

      <NewsSchema
        title={trend.title}
        description={trend.summary}
        image={imageUrl}
        slug={trend.slug}
        publishedAt={trend.publishedAt || trend.createdAt}
        category={trend.category}
      />

      <article className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT CONTENT */}
        <div className={hideComments ? "lg:col-span-4" : "lg:col-span-3"}>
          {trend.image && (
            <img
              src={imageUrl}
              alt={trend.title}
              className="w-full max-h-[500px] object-contain rounded-xl mb-6"
            />
          )}

          <h1 className="text-3xl font-extrabold text-gray-900">
            {trend.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {trend.category} ·{" "}
            {hideComments
              ? formatDate(trend.publishedAt || trend.createdAt)
              : formatRelativeTime(trend.createdAt)}
            {!hideComments && <> · 🔥 {trend.popularityScore}</>} ·{" "}
            <span className="font-medium text-gray-700">By {author.name}</span>
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">{trend.summary}</p>

          {hideComments && trend.sourceUrl && (
            <a
              href={trend.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 text-sm font-medium text-orange-600"
            >
              View source →
            </a>
          )}
        </div>

        {!hideComments && <CommentsSidebar slug={trend.slug} />}

        <div className="mt-10 flex gap-4 flex-wrap">
          <Link to="/" className="text-orange-600 font-semibold">
            ← Trending
          </Link>

          <Link
            to={`/category/${trend.category}`}
            className="text-orange-600 font-semibold"
          >
            More {trend.category} news →
          </Link>
        </div>
      </article>
    </>
  );
}
