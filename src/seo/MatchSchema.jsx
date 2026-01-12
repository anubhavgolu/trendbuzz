import { Helmet } from "react-helmet-async";

const MatchSchema = ({ match }) => {
  if (!match) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `${match.team1.name} vs ${match.team2.name} – ICC Men’s T20 World Cup 2026`,
    "description": `Match between ${match.team1.name} and ${match.team2.name} in the ICC Men’s T20 World Cup 2026.`,
    "startDate": match.date,
    "endDate": match.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "sport": "Cricket",
    "image": "https://www.trendbuzzs.com/assets/worldcup-2026-cover.jpg",
    "location": {
      "@type": "Place",
      "name": match.venue,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "competitor": [
      { "@type": "SportsTeam", "name": match.team1.name },
      { "@type": "SportsTeam", "name": match.team2.name }
    ],
    "organizer": {
      "@type": "Organization",
      "name": "International Cricket Council",
      "url": "https://www.icc-cricket.com"
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

export default MatchSchema;
