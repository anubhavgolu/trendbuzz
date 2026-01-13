import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo, useEffect, useState } from "react";
import SEO from "../components/SEO";

/* ================= TOC (ONLY H2) ================= */
function extractHeadings(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return [...doc.querySelectorAll("h2")].map((h) => ({
    id: h.id,
    text: h.textContent,
  }));
}

export default function Article() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ARTICLE ================= */
  useEffect(() => {
    async function loadArticle() {
      setLoading(true);

      const url = slug
        ? `${import.meta.env.VITE_API_BASE_URL}/api/articles/${slug}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/articles`;

      const res = await fetch(url);

      if (!res.ok) {
        setArticle(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setArticle(data);
      setLoading(false);
    }

    loadArticle();
  }, [slug]);

  /* ================= STATES ================= */
  const headings = useMemo(
    () => extractHeadings(article?.content),
    [article?.content]
  );

  // ✅ RETURNS AFTER ALL HOOKS
  if (loading) return <div className="p-6">Loading…</div>;
  if (!article) return <div className="p-6">Article not found</div>;
  if (slug === "-") {
    return <div className="p-6">Invalid article</div>;
  }

  /* ================= UI ================= */
  return (
    <>
      {/* 🔥 SEO */}
      <SEO
        title={`${article.seoTitle || article.title} | TrendBuzzs`}
        description={article.seoDescription || article.excerpt}
        image={article.image}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            image: [article.image],
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            author: {
              "@type": "Organization",
              name: "TrendBuzzs",
              url: "https://www.trendbuzzs.com",
            },
            publisher: {
              "@type": "Organization",
              name: "TrendBuzzs",
              logo: {
                "@type": "ImageObject",
                url: "https://www.trendbuzzs.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.trendbuzzs.com/article/${article.slug}`,
            },
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 pt-4 h-[calc(100vh-56px)]">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/article"
            className="text-sm text-gray-600 hover:text-orange-600"
          >
            ← Back to Articles
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 h-full">
          {/* SIDE TOC */}
          <aside className="hidden lg:block sticky top-20">
            <div className="pl-4 border-l">
              <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
                On this page
              </p>

              <ul className="space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-gray-600 hover:text-orange-600"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ARTICLE */}
          <article className="max-w-3xl h-full overflow-y-auto pr-3 custom-scroll">
            <header className="mb-6">
              <h1 className="text-3xl font-bold leading-tight">
                {article.title}
              </h1>

              {!slug && (
                <p className="mt-2 text-sm text-gray-500">Latest article</p>
              )}

              <div className="mt-3 text-sm text-gray-500 flex gap-2">
                <span>TrendBuzzs</span>
                <span>•</span>
                <time>{new Date(article.publishedAt).toDateString()}</time>
              </div>
            </header>

            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                width="1200"
                height="630"
                className="w-full rounded-xl mb-8"
                loading="lazy"
              />
            )}

            <section
              className="
                prose prose-lg max-w-none text-gray-800
                prose-p:leading-relaxed
                prose-p:my-4
                prose-ul:my-6
                prose-ul:pl-6
                prose-li:my-3
                prose-li:leading-relaxed
                prose-li::marker:text-orange-500
                prose-li::marker:text-lg
              "
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
            />
          </article>
        </div>
      </div>
    </>
  );
}
