import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrends } from "../services/api";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import CommentsSidebar from "../sections/CommentsSidebar.jsx";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate.js";
import NewsSchema from "../components/NewsSchema";

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
    return <p className="p-10">Loading...</p>;
  }

  const imageUrl=trend.image?.startWith("http")?trend.image:`https://trendbuzzs.com${trend.image}`;

  const hideComments = trend.platform !== "Reddit";


  return (
    <>
    <SEO
        title={`${trend.title} | TrendBuzz`}
        description={trend.summary}
        keywords={trend.keywords?.combined?.join(", ")}
      />

      <NewsSchema
        title={trend.title}
        description={trend.summary}
        image={imageUrl}
        slug={trend.slug}
        publishedAt={trend.createdAt}
        category={trend.category}
      />
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* LEFT CONTENT */}
      <div className={hideComments ? "lg:col-span-4" : "lg:col-span-3"}>
        {trend.image && (
          <img
            src={trend.image}
            alt={trend.title}
            className="w-full max-h-[500px] object-contain rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl font-extrabold text-gray-900">{trend.title}</h1>

        {/* META */}
        <p className="mt-2 text-sm text-gray-500">
          {trend.category} ·{" "}
          {hideComments
            ? formatDate(trend.createdAt)
            : formatRelativeTime(trend.createdAt)}
          {!hideComments && <> · 🔥 {trend.popularityScore}</>}
        </p>

        {/* SUMMARY */}
        <p className="mt-6 text-gray-700 leading-relaxed">{trend.summary}</p>

        {/* SOURCE (NASA only) */}
        {hideComments && trend.sourceUrl && (
          <a
            href={trend.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-sm font-medium text-orange-600"
          >
            View on NASA →
          </a>
        )}
      </div>
     
      {/* RIGHT SIDEBAR (ONLY FOR REDDIT) */}
      {!hideComments && <CommentsSidebar slug={trend.slug} />}
       <div className="mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline"
        >
          ← Back to Trending
        </Link>
      </div>
    </div>
    
      </>
  );
}
