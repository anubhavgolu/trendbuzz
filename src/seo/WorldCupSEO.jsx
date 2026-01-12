import { Helmet } from "react-helmet-async";

const COVER_IMAGE =
  "https://www.trendbuzzs.com/assets/worldcup-2026-cover.jpeg";

const WorldCupSEO = ({
  title,
  description,
  url,
  pageType = "Schedule",
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `ICC Men’s T20 World Cup 2026 – ${pageType}`,
    "description": description,
    "startDate": "2026-02-07",
    "endDate": "2026-03-08",
    "eventStatus": "https://schema.org/EventScheduled",
    "sport": "Cricket",
    "image": COVER_IMAGE,
    "location": {
      "@type": "Place",
      "name": "India & Sri Lanka",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "International Cricket Council",
      "url": "https://www.icc-cricket.com",
    },
    "url": url,
  };

  return (
    <Helmet>
      {/* BASIC SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* OPEN GRAPH (Google Discover + WhatsApp) */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="TrendBuzzs" />
      <meta property="og:image" content={COVER_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* STRUCTURED DATA */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default WorldCupSEO;
