import { getSavedTrends } from "../utils/savedTrends";
import TrendCard from "../components/TrendCard";
import PageTransition from "../components/PageTransition";
import { useState, useEffect } from "react";

export default function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getSavedTrends());
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <h1 className="text-2xl font-extrabold text-gray-900">
          ⭐ Saved Trends
        </h1>
        <p className="mt-2 text-gray-600">
          Your bookmarked trending topics.
        </p>

        {saved.length === 0 ? (
          <p className="mt-10 text-gray-500 text-center">
            No saved trends yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((trend) => (
              <TrendCard key={trend.slug} {...trend} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
