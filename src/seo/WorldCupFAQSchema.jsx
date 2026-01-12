import { Helmet } from "react-helmet-async";

const WorldCupFAQSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When is the ICC Men’s T20 World Cup 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The ICC Men’s T20 World Cup 2026 is scheduled to begin in February 2026, with matches played across India and Sri Lanka."
        }
      },
      {
        "@type": "Question",
        "name": "Where will T20 World Cup 2026 be hosted?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The ICC Men’s T20 World Cup 2026 will be jointly hosted by India and Sri Lanka."
        }
      },
      {
        "@type": "Question",
        "name": "How many teams are playing in T20 World Cup 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "A total of 20 international teams are expected to participate in the ICC Men’s T20 World Cup 2026."
        }
      },
      {
        "@type": "Question",
        "name": "When is the T20 World Cup 2026 final?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The final of the ICC Men’s T20 World Cup 2026 is expected to be played in March 2026 at a major stadium."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default WorldCupFAQSchema;
