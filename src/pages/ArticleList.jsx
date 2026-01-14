import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Helmet } from "react-helmet-async";

const categories = ["all", "health", "tech", "news"];
function FeaturedSkeleton() {
  return (
    <div className="mb-10 animate-pulse">
      <div className="w-full h-64 bg-gray-200 rounded-xl mb-4" />
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  );
}

function ArticleRowSkeleton() {
  return (
    <div className="flex gap-4 border rounded-xl p-4 animate-pulse">
      <div className="w-32 h-20 bg-gray-200 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const hasAnyArticle =
    (featured && featured.slug && featured.slug !== "-") || articles.length > 0;

  useEffect(() => {
    loadArticles(true);
  }, [lang, category]);

  async function loadArticles(reset = false) {
    if (loading) return;

    setLoading(true);

    const url = new URL(
      `${import.meta.env.VITE_API_BASE_URL}/api/articles/list`
    );

    url.searchParams.set("page", reset ? 1 : page);
    url.searchParams.set("lang", lang);
    if (category !== "all") {
      url.searchParams.set("category", category);
    }

    const res = await fetch(url);
    const data = await res.json();

    const { featured, articles } = data;

    if (reset) {
      setFeatured(featured || null);
      setArticles(articles || []);
      setPage(2);
    } else {
      setArticles((prev) => [...prev, ...(articles || [])]);
      setPage((p) => p + 1);
    }

    setLoading(false);
    setHasFetched(true);
  }

  return (
    <>
      <SEO
        title="Articles | TrendBuzzs"
        description="In-depth trending articles from TrendBuzzs"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.trendbuzzs.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Articles",
                item: "https://www.trendbuzzs.com/article",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Articles</h1>

          <Link to="/" className="text-sm text-gray-600 hover:text-orange-600">
            ← Back to Home
          </Link>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>

          {/* LANGUAGE */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="px-3 py-1 text-sm rounded-full bg-gray-100"
          >
            {lang === "en" ? "EN" : "हिंदी"}
          </button>
        </div>

        {/* FEATURED */}
        {isInitialLoad && loading && <FeaturedSkeleton />}

        {!loading && featured?.slug && featured.slug !== "-" && (
          <Link to={`/article/${featured.slug}`} className="block mb-10">
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
                loading="lazy"
              />
            )}

            <h2 className="text-2xl font-bold">{featured.title}</h2>

            {featured.excerpt && (
              <p className="text-gray-600 mt-2">{featured.excerpt}</p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              {new Date(featured.publishedAt).toDateString()}
            </p>
          </Link>
        )}

        <div className="space-y-6">
          {/* initial load */}
          {isInitialLoad && loading && (
            <>
              <ArticleRowSkeleton />
              <ArticleRowSkeleton />
              <ArticleRowSkeleton />
            </>
          )}

          {/* existing articles (always visible) */}
          {articles
            .filter((a) => a.slug && a.slug !== "-")
            .map((a) => (
              <Link
                key={a.slug}
                to={`/article/${a.slug}`}
                className="flex gap-4 border rounded-xl p-4 hover:shadow"
              >
                {a.image && (
                  <img
                    src={a.image}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {a.excerpt}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(a.publishedAt).toDateString()}
                  </p>
                </div>
              </Link>
            ))}

          {/* bottom loader (scroll time) */}
          {!isInitialLoad && loading && (
            <div className="flex justify-center py-6">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          )}

          {/* real empty */}
          {!loading && hasFetched && !hasAnyArticle && (
            <p className="text-center text-gray-500">No articles found</p>
          )}
        </div>

        {/* LOAD MORE */}
        <div className="text-center mt-8">
          <button
            onClick={() => loadArticles()}
            disabled={loading}
            className="px-6 py-2 bg-orange-500 text-white rounded-full disabled:opacity-60"
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        </div>
      </div>
    </>
  );
}
