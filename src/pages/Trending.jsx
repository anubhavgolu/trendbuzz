import { useEffect, useState } from "react";
import TrendingTabs from "../components/TrendingTabs";
import ContentGrid from "../sections/ContentGrid";
import { API_BASE } from "../services/http";
import { fetchSection } from "../services/contentApi";
import SEO from "../components/SEO";

function TrendingSkeleton({ title }) {
  return (
    <section>
      {title && <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />}

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border overflow-hidden flex flex-col animate-pulse"
          >
            {/* image */}
            <div className="aspect-[16/9] bg-gray-200" />

            {/* content */}
            <div className="p-4 flex flex-col flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-11/12" />
              <div className="h-4 bg-gray-200 rounded w-8/12" />

              <div className="h-3 bg-gray-200 rounded w-full mt-2" />
              <div className="h-3 bg-gray-200 rounded w-10/12" />
              <div className="h-3 bg-gray-200 rounded w-9/12" />

              <div className="mt-auto pt-4 flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Trending() {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/sections`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setSections(data);
          setActive(data[0]);
        }
      });
  }, []);
  useEffect(() => {
    if (!active) return;

    setLoading(true);
    setHasFetched(false);

    fetchSection(active)
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        setLoading(false);
        setHasFetched(true);
      });
  }, [active]);


  return (
    <>
      <SEO
        title="Trending on TrendBuzzs"
        description="What people are reading right now across tech, news, memes and entertainment."
      />

      <TrendingTabs sections={sections} active={active} onChange={setActive} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <TrendingSkeleton title={active} />
        ) : items.length > 0 ? (
          <ContentGrid title={active} items={items} />
        ) : hasFetched ? (
          <p className="text-gray-500 text-sm">No trending content yet.</p>
        ) : null}
      </main>
    </>
  );
}
