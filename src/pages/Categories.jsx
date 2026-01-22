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
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/content/sections`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          const names = data
            .map((s) => (typeof s === "string" ? s : s?.name))
            .filter(Boolean);

          setSections(names);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Section load error", e);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <>
      <SEO
        title="Categories | TrendBuzzs"
        description="Browse TrendBuzzs categories including tech tips, how-to guides, online services, and helpful updates."
        canonical="https://www.trendbuzzs.com/categories"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TrendBuzzs",
            url: "https://www.trendbuzzs.com",
            publisher: {
              "@type": "Organization",
              name: "TrendBuzzs",
              logo: {
                "@type": "ImageObject",
                url: "https://www.trendbuzzs.com/assets/trendbuzz_logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-16">
        <header className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Categories
          </h1>
          <p className="text-gray-600">
            Explore helpful guides, tech tips, and useful information by
            category.
          </p>
        </header>

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