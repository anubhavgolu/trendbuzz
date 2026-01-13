import { Helmet } from "react-helmet-async";

export default function DefaultSEO() {
  const siteUrl = "https://www.trendbuzzs.com";

  return (
    <Helmet>
      <title>TrendBuzzs – Trending News, Tech & Science</title>
      <meta
        name="description"
        content="TrendBuzzs brings you the latest trending news from tech, science, space, and global topics."
      />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="TrendBuzzs" />
      <meta
        property="og:description"
        content="Latest trending news and stories from around the web."
      />
      <meta property="og:url" content={siteUrl} />
    </Helmet>
  );
}
