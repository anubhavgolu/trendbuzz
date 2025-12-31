import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrendCard from "../components/TrendCard";
import { fetchTrends } from "../services/api";

const CATEGORY_TITLES = {
  tech: "🔥 Tech Trends",
  news: "📰 News",
  memes: "😂 Memes",
  entertainment: "🎬 Entertainment",
};

export default function CategoryPage() {
  const { category } = useParams();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchTrends();
      setTrends(Array.isArray(data) ? data : []);
    }
    load();
  }, [category]);

  const filtered = trends
    .filter((t) => t.category === category)
    .sort((a, b) => b.popularityScore - a.popularityScore);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        {CATEGORY_TITLES[category] || "Trending"}
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No trends found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trend) => (
            <TrendCard key={trend.slug} {...trend} />
          ))}
        </div>
      )}
    </div>
  );
}
