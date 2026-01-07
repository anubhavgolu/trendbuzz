import { useEffect, useState, useMemo } from "react";
import TrendingNow from "../sections/TrendingNow";
import Spotlight from "../sections/Spotlight";
import CategorySection from "../components/CategorySection";
import TopDiscussions from "../sections/TopDiscussions";
import TrendCardSkeleton from "../components/TrendCardSkeleton";
import { fetchTrends } from "../services/api";
import PageTransition from "../components/PageTransition";
import NasaCarousel from "../components/NasaCarousel";
import TrendCard from "../components/TrendCard";

export default function TrendingCards() {
  const [trends, setTrends] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // null = ALL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTrends();
        setTrends(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load trends");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ---------------- DERIVED DATA ---------------- */
  const nasaTrends = useMemo(
    () => trends.filter((t) => t.platform === "NASA"),
    [trends]
  );

  const redditTrends = useMemo(
    () => trends.filter((t) => t.platform !== "NASA"),
    [trends]
  );

  const filteredRedditTrends = useMemo(() => {
    if (activeTab === "popular-today") {
      return [...redditTrends].sort(
        (a, b) => b.popularityScore - a.popularityScore
      );
    }
    return redditTrends;
  }, [activeTab, redditTrends]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <TrendCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* 🔥 TRENDING NOW */}
        <TrendingNow onChange={setActiveTab} />

        {/* ================= NASA TAB ================= */}
        {activeTab === "nasa" && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold mb-6">
              🚀 Space & Science Updates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nasaTrends.slice(0, 4).map((trend) => (
                <TrendCard key={trend.slug} {...trend} />
              ))}
            </div>
          </div>
        )}

        {/* ================= MOST POPULAR TODAY ================= */}
        {activeTab === "popular-today" && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold mb-6">
              🔥 Most Popular Today
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRedditTrends.slice(0,6).map((trend) => (
                <TrendCard key={trend.slug} {...trend} />
              ))}
            </div>
          </div>
        )}

        {/* ================= REDDIT / ALL / POPULAR ================= */}
        {activeTab !== "nasa" && activeTab !== "popular-today" && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-3 space-y-14">
              {/* 🌟 SPOTLIGHT */}
              <Spotlight trends={filteredRedditTrends} />

              <CategorySection
                title="🔥 Tech Trends"
                category="tech"
                trends={filteredRedditTrends}
              />

              <CategorySection
                title="📰 News"
                category="news"
                trends={filteredRedditTrends}
              />

              {nasaTrends.length > 0 && activeTab !== "popular-today" && (
                <NasaCarousel items={nasaTrends} />
              )}

              <CategorySection
                title="😂 Memes"
                category="memes"
                trends={filteredRedditTrends}
              />

              <CategorySection
                title="🎬 Entertainment"
                category="entertainment"
                trends={filteredRedditTrends}
              />
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block">
              <TopDiscussions trends={filteredRedditTrends} />
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
