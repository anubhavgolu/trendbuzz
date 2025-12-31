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
        title="TrendBuzz – Why Topics Are Trending Today"
        description="TrendBuzz explains why topics are trending on Twitter, Reddit, and across the internet in simple words."
        keywords="trending topics, twitter trends, reddit trends, viral news"
      />
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Trending Cards (from Home logic) */}
            <TrendingCards filter={filter} />

            {/* Category Sections */}
            <TrendingSections />
          </div>

          {/* Right Sidebar */}
          <TopDiscussions />
        </div>
      </div>
    </>
  );
}
