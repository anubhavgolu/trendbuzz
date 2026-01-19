import { Helmet } from "react-helmet-async";

export default function DefaultSEO() {
  const siteUrl = "https://www.trendbuzzs.com";
  const defaultTitle = "TrendBuzzs – Trending News, Tech & Science";
  const defaultDescription =
    "TrendBuzzs brings you the latest trending news from tech, science, space, and global topics.";

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : siteUrl;

  const defaultOgImage = "https://www.trendbuzzs.com/assets/trendbuzz_logo.png";

  return (
    <Helmet>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TrendBuzzs" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={defaultOgImage} />
    </Helmet>
  );
}
