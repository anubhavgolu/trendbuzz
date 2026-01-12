import { Helmet } from "react-helmet-async";

const PublisherSEO = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "TrendBuzzs",
    "url": "https://www.trendbuzzs.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.trendbuzzs.com/assets/trendbuzz_logo.png",
      "width": 600,
      "height": 60
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default PublisherSEO;
