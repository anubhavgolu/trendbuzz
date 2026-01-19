import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import ContentGrid from "../sections/ContentGrid";
import { fetchSection } from "../services/contentApi";
import { Helmet } from "react-helmet-async";

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSection(category)
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const title = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const seoTitle = `Latest ${title} News, Trends & Viral Stories | TrendBuzzs`;
  const seoDesc = `Read the latest ${title.toLowerCase()} news, trending stories, and viral updates curated and explained by TrendBuzzs editors.`;

  const pageUrl = `https://www.trendbuzzs.com/category/${category}`;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} canonical={pageUrl} />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${title} News & Trends`,
            description: seoDesc,
            url: pageUrl,
            isPartOf: {
              "@type": "WebSite",
              name: "TrendBuzzs",
              url: "https://www.trendbuzzs.com",
            },
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
                item: "https://www.trendbuzzs.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: title,
                item: pageUrl,
              },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <header className="max-w-3xl mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {title} News & Trends
          </h1>
          <p className="text-gray-600">
            Coverage of {title.toLowerCase()} news and trending topics based on
            publicly available information.
          </p>
        </header>

        {loading && (
          <p className="text-gray-500 text-sm">Loading {title} stories…</p>
        )}

        {!loading && items.length === 0 && (
          <div className="text-gray-500 text-sm space-y-3">
            <p>No {title.toLowerCase()} content available right now.</p>
            <Link
              to="/trending"
              className="text-orange-600 font-semibold hover:underline"
            >
              View Trending Stories →
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <ContentGrid title={title} items={items} showViewAll={false} />
        )}
      </main>
    </>
  );
}
