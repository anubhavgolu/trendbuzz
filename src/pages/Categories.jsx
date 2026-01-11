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
        if (mounted && Array.isArray(data)) setSections(data);
      } catch (e) {
        console.error("Section load error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <SEO
        title="Latest Trending News, Viral Stories & Internet Buzz | TrendBuzz"
        description="TrendBuzz brings you real-time trending news from technology, entertainment, sports, and viral internet stories — explained clearly and updated continuously."
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TrendBuzz",
            url: "https://www.trendbuzzs.com",
            publisher: {
              "@type": "Organization",
              name: "TrendBuzz",
              logo: {
                "@type": "ImageObject",
                url: "https://www.trendbuzzs.com/trendbuzz_logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-16">
        <header className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Latest Trending News, Viral Stories & Internet Buzz
          </h1>
          <p className="text-gray-600">
            Stay updated with real-time trending stories from news, technology,
            entertainment, sports, and the internet — curated and explained by
            TrendBuzz.
          </p>
        </header>

        {loading && (
          <>
            <SectionSkeleton title="Top Stories" />
            <SectionSkeleton title="Technology" />
            <SectionSkeleton title="Trending News" />
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
