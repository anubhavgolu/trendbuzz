import { useParams } from "react-router-dom";
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

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const seoTitle = `Latest ${title} News, Trends & Viral Stories | TrendBuzz`;
  const seoDesc = `Read the latest ${title.toLowerCase()} news, trending stories, and viral updates curated and explained by TrendBuzz editors.`;

  return (
    <>
 
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={`https://www.trendbuzzs.com/category/${category}`}
      />

      <Helmet>
    
        <meta name="googlebot-news" content="index,follow" />
        <meta name="googlebot" content="max-image-preview:large" />

  
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${title} News & Trends`,
            description: seoDesc,
            url: `https://www.trendbuzzs.com/category/${category}`,
            isPartOf: {
              "@type": "WebSite",
              name: "TrendBuzz",
              url: "https://www.trendbuzzs.com",
            },
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
          <p className="text-gray-500 text-sm">
            No {title.toLowerCase()} content available right now.
          </p>
        )}

        {items.length > 0 && <ContentGrid title={title} items={items} />}
      </main>
    </>
  );
}
