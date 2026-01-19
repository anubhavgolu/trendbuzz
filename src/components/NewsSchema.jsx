import { Helmet } from "react-helmet-async";

export default function NewsSchema({
  title = "",
  description = "",
  image,
  slug,
  publishedAt,
  category = "General",
  authorName,
  keywords,
}) {
  const siteUrl = "https://www.trendbuzzs.com";

  const date =
    publishedAt && !isNaN(new Date(publishedAt))
      ? new Date(publishedAt)
      : new Date();

  const pageUrl = `${siteUrl}/trend/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${pageUrl}#newsarticle`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: title.substring(0, 110),
    description,
    image: image
      ? [
          {
            "@type": "ImageObject",
            url: image,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    datePublished: date.toISOString(),
    dateModified: date.toISOString(),
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : {
          "@type": "Organization",
          name: "TrendBuzzs",
          url: siteUrl,
        },

    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#publisher`,
      name: "TrendBuzzs",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://www.trendbuzzs.com/assets/trendbuzz_logo.png",
        width: 600,
        height: 60,
      },
    },

    articleSection: category,
    isAccessibleForFree: true,
    inLanguage: "en-IN",

    keywords: Array.isArray(keywords)
      ? keywords.join(", ")
      : typeof keywords === "string"
      ? keywords
      : undefined,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
