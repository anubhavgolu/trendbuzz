import { Helmet } from "react-helmet-async";

export default function NewsSchema({
  title = "",
  description = "",
  image,
  slug,
  publishedAt,
  category = "General",
}) {
  const date =
    publishedAt && !isNaN(new Date(publishedAt))
      ? new Date(publishedAt)
      : new Date();

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://www.trendbuzzs.com/trend/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.trendbuzzs.com/trend/${slug}`,
    },
    headline: title.substring(0, 110),
    description,
    image: image
      ? [{
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        }]
      : undefined,
    datePublished: date.toISOString(),
    dateModified: date.toISOString(),
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
    articleSection: category,
    isAccessibleForFree: true,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
