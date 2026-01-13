import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const categories = ["all", "health", "tech", "news"];

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadArticles(true);
  }, [lang, category]);

  async function loadArticles(reset = false) {
    if (loading && !reset) return; 
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
  }

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadArticles();
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [articles]); 

  return (
    <>
      <SEO
        title="Articles | TrendBuzzs"
        description="In-depth trending articles from TrendBuzzs"
      />

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
        {featured?.slug && featured.slug !== "-" && (
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

        {/* LIST */}
        <div className="space-y-6">
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
        </div>

        {/* LOAD MORE */}
        <div className="text-center mt-8">
          <button
            onClick={() => loadArticles()}
            disabled={loading}
            className="px-6 py-2 bg-orange-500 text-white rounded-full"
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        </div>
      </div>
    </>
  );
}
