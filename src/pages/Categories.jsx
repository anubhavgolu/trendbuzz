import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import SectionRenderer from "../sections/SectionRenderer";
import { API_BASE } from "../services/http";
import SectionSkeleton from "../components/skeletons/SectionSkeleton";
import { Helmet } from "react-helmet-async";

export default function Categories() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/content/sections`);
        const data = await res.json();

        if (mounted && Array.isArray(data)) {
          setSections(data);
        }
      } catch (e) {
        console.error("Section load error", e);
        if (mounted) setSections([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  {
    loading && (
      <div className="text-center text-sm text-gray-400 animate-pulse">
        Loading trending stories…
      </div>
    );
  }

  return (
    <>
      <SEO
        title="TrendBuzzs – Today’s Top Stories"
        description="Editor-curated top stories, tech, entertainment and videos."
      />
      <Helmet>
        <meta name="googlebot-news" content="index,follow" />
        <meta name="googlebot" content="max-image-preview:large" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-20">
        <h1 className="sr-only">TrendBuzzs</h1>

        {loading && (
          <>
            <SectionSkeleton title="Top" />
            <SectionSkeleton title="Tech" />
            <SectionSkeleton title="News" />
          </>
        )}

        {!loading &&
          sections.map((section) => (
            <SectionRenderer key={section} section={section} />
          ))}
      </main>
    </>
  );
}
