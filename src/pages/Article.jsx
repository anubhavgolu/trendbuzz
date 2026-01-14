import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo, useEffect, useState } from "react";
import SEO from "../components/SEO";

function extractHeadings(html) {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const usedIds = new Set();

  return [...doc.querySelectorAll("h2")].map((h, index) => {
    let id =
      h.id ||
      h.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (usedIds.has(id)) id = `${id}-${index}`;
    usedIds.add(id);

    h.id = id;

    return {
      id,
      text: h.textContent,
    };
  });
}

function ArticleSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="pl-4 border-l space-y-3">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-40 bg-gray-200 rounded" />
            ))}
          </div>
        </aside>

        <article className="max-w-3xl">
          <div className="h-9 w-3/4 bg-gray-300 rounded mb-4" />

          
          <div className="h-4 w-48 bg-gray-200 rounded mb-6" />

        
          <div className="w-full aspect-[1200/630] bg-gray-200 rounded-xl mb-8" />

       
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}

            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Article() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadArticle() {
      setLoading(true);

      const url = slug
        ? `${import.meta.env.VITE_API_BASE_URL}/api/articles/${slug}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/articles`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Not found");

        const data = await res.json();
        setArticle(data);
      } catch {
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  
  const headings = useMemo(
    () => extractHeadings(article?.content),
    [article?.content]
  );


  if (loading) return <ArticleSkeleton />;

  if (!article)
    return <div className="p-6 text-red-600">Article not found</div>;

  if (slug === "-")
    return <div className="p-6 text-red-600">Invalid article</div>;

 
  return (
    <>
   
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
            dateModified: article.updatedAt || article.publishedAt,
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
            articleSection: article.section || "News",
          })}
        </script>
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
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://www.trendbuzzs.com/article/${article.slug}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 pt-4">
    
        <div className="mb-6">
          <Link
            to="/article"
            className="text-sm text-gray-600 hover:text-orange-600"
          >
            ← Back to Articles
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
         
          {headings.length > 0 && (
            <aside className="hidden lg:block sticky top-20 self-start">
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
          )}

         
          <article className="max-w-3xl">
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
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toDateString()}
                </time>
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
                prose-h2:scroll-mt-24
                prose-p:leading-relaxed
                prose-p:my-4
                prose-ul:my-6
                prose-ul:pl-6
                prose-li:my-3
                prose-li:leading-relaxed
                prose-li::marker:text-orange-500
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </div>
    </>
  );
}
