import { useEffect, useState } from "react";
import { fetchTrends } from "../services/api";
import CategorySection from "../components/CategorySection";
import TrendingTabs from "../components/TrendingTabs";
import AnimatedSection from "../components/AnimatedSection";

export default function Trending() {
  const [trends, setTrends] = useState([]);
  const [active, setActive] = useState("tech");

  useEffect(() => {
    fetchTrends().then(setTrends);
  }, []);

  return (
    <div className="pb-16">
      {/* TABS */}
      <TrendingTabs active={active} onChange={setActive} />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <AnimatedSection animationKey={active}>
          {active === "tech" && (
            <CategorySection title="🔥 Tech" category="tech" trends={trends} />
          )}

          {active === "news" && (
            <CategorySection title="📰 News" category="news" trends={trends} />
          )}

          {active === "memes" && (
            <CategorySection title="😂 Memes" category="memes" trends={trends} />
          )}

          {active === "entertainment" && (
            <CategorySection
              title="🎬 Entertainment"
              category="entertainment"
              trends={trends}
            />
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
