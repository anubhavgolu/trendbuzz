import { useState } from "react";
import TrendingNow from "../sections/TrendingNow";
import TrendingCards from "../sections/TrendingCards";
import TrendingSections from "../sections/TrendingSections";
import TopDiscussions from "../sections/TopDiscussions";
import SEO from "../components/SEO";

export default function Categories() {
  const [filter, setFilter] = useState("ALL");

  return (
    <>
      <SEO
        title="TrendBuzzs – Why Topics Are Trending Today"
        description="TrendBuzzs explains why topics are trending today on Reddit, Twitter, tech, science, and global news in simple language."
        keywords="why trending today, trending topics today, reddit trends, twitter trends, viral news explanation"
        canonical="https://www.trendbuzzs.com/"
        image="https://www.trendbuzzs.com/og-home.png"
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* H1 FOR SEO */}
        <h1 className="sr-only">
          Why Topics Are Trending Today – TrendBuzzs
        </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Left Content */}
          <section className="lg:col-span-3 space-y-12">
            {/* Trending Cards */}
            <TrendingCards filter={filter} />

            {/* Category Sections */}
            <TrendingSections />
          </section>

          {/* Right Sidebar */}
          <aside>
            <TopDiscussions />
          </aside>
        </div>
      </main>
    </>
  );
}
