import { useEffect, useState } from "react";
import TrendCard from "../components/TrendCard";
import TrendCardSkeleton from "../components/TrendCardSkeleton";
import SEO from "../components/SEO";
import { fetchTrends } from "../services/api";
import PageTransition from "../components/PageTransition";

export default function Search() {
  const [query, setQuery] = useState("");
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrends() {
      setLoading(true);
      const data = await fetchTrends();
      setTrends(Array.isArray(data) ? data : []);
      setLoading(false);
    }

    loadTrends();
  }, []);

  const q = query.toLowerCase();

  const filteredTrends = trends.filter((trend) =>
    trend.title?.toLowerCase().includes(q) ||
    trend.summary?.toLowerCase().includes(q) ||
    trend.platform?.toLowerCase().includes(q) ||
    trend.category?.toLowerCase().includes(q)
  );

  return (
    <>
      <SEO
        title="Search Trending Topics | TrendBuzzs"
        description="Search trending topics across Reddit and the internet."
        keywords="search trends, trending topics search"
      />
<PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Search Trends 🔍
        </h1>
        <p className="mt-2 text-gray-600">
          Find trending topics across categories and platforms.
        </p>

        {/* Search Input */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search trends, topics, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-2/3 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Results */}
        <div className="mt-8">
          {query && (
            <p className="text-sm text-gray-500 mb-4">
              Showing results for{" "}
              <span className="font-medium">"{query}"</span>
            </p>
          )}

          {/* 🔥 LOADING */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <TrendCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* ✅ RESULTS */}
          {!loading && filteredTrends.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrends.map((trend) => (
                <TrendCard key={trend.slug} {...trend} />
              ))}
            </div>
          )}

          {/* ❌ NO RESULTS */}
          {!loading && query && filteredTrends.length === 0 && (
            <p className="text-gray-500">
              No trends found. Try a different keyword.
            </p>
          )}
        </div>
      </div>
      </PageTransition>
    </>
  );
}
