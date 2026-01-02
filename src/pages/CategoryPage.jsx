import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrendCard from "../components/TrendCard";
import { fetchTrends } from "../services/api";
import SEO from "../components/SEO";

const CATEGORY_META = {
  tech: {
    title: "Technology News & Trending Tech Stories",
    description:
      "Read the latest technology news, AI trends, startups, gadgets, and viral tech stories updated in real time.",
    h1: "Latest Technology News & Trends",
  },
  news: {
    title: "Latest News & Breaking Stories",
    description:
      "Stay updated with the latest breaking news, trending headlines, and important stories from around the world.",
    h1: "Latest News & Breaking Stories",
  },
  entertainment: {
    title: "Entertainment News & Viral Stories",
    description:
      "Explore trending entertainment news, movies, celebrities, viral videos, and pop culture updates.",
    h1: "Entertainment News & Viral Stories",
  },
  memes: {
    title: "Trending Memes & Internet Culture",
    description:
      "Discover the latest trending memes, viral jokes, and internet culture moments people are talking about.",
    h1: "Trending Memes & Internet Culture",
  },
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

  const meta = CATEGORY_META[category];

  const filtered = trends
    .filter((t) => t.category === category)
    .sort((a, b) => b.popularityScore - a.popularityScore);

  if (!meta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const [topStory, ...restStories] = filtered;

  return (
    <>
      <SEO
        title={`${meta.title} | TrendBuzzs`}
        description={meta.description}
        keywords={`${category} news, trending ${category}, latest ${category} updates`}
        canonical={`https://www.trendbuzzs.com/category/${category}`}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* H1 */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {meta.h1}
        </h1>

        {/* FRESHNESS */}
        <p className="text-sm text-gray-500 mb-8">
          Updated {new Date().toLocaleDateString()} · Live trending stories
        </p>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No stories available right now.</p>
        ) : (
          <>
            {/* 🔥 TOP STORY (CTR BOOST) */}
            {topStory && (
              <div className="mb-10">
                <TrendCard {...topStory} featured />
              </div>
            )}

            {/* OTHER STORIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restStories.map((trend) => (
                <TrendCard key={trend.slug} {...trend} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
