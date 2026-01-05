import { useEffect, useState } from "react";
import TrendingTabs from "../components/TrendingTabs";
import ContentGrid from "../sections/ContentGrid";
import { API_BASE } from "../services/http";
import { fetchSection } from "../services/contentApi";
import SEO from "../components/SEO";

export default function Trending() {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState("");
  const [items, setItems] = useState([]);

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
    fetchSection(active).then(setItems);
  }, [active]);

  return (
    <>
      <SEO
        title="Trending on TrendBuzzs"
        description="What people are reading right now across tech, news, memes and entertainment."
      />

      <TrendingTabs
        sections={sections}
        active={active}
        onChange={setActive}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {items.length > 0 ? (
          <ContentGrid title={active} items={items} />
        ) : (
          <p className="text-gray-500 text-sm">
            No trending content yet.
          </p>
        )}
      </main>
    </>
  );
}
