import { Helmet } from "react-helmet-async";

export default function NewsSchema({
  title,
  description,
  image,
  slug,
  publishedAt,
  category,
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://trendbuzzs.com/trend/${slug}`,
    },
    "headline": title,
    "description": description,
    "image": [image],
    "datePublished": new Date(publishedAt).toISOString(),
    "dateModified": new Date(publishedAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "TrendBuzzs",
      "url": "https://trendbuzzs.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "TrendBuzzs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trendbuzzs.com/logo.png",
      },
    },
    "articleSection": category,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
