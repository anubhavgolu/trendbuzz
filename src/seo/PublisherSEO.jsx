import { Helmet } from "react-helmet-async";

const PublisherSEO = () => {
  const siteUrl = "https://www.trendbuzzs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "@id": `${siteUrl}/#publisher`,
    name: "TrendBuzzs",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: "https://www.trendbuzzs.com/assets/trendbuzz_logo.png",
      width: 600,
      height: 60,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default PublisherSEO;
