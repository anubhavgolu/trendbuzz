import { Helmet } from "react-helmet-async";

const MatchSchema = ({ match }) => {
  if (!match) return null;

  const siteUrl = "https://www.trendbuzzs.com";

  const startDateISO = match.date
    ? new Date(match.date).toISOString()
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${match.team1?.name} vs ${match.team2?.name} – ICC Men’s T20 World Cup 2026`,
    description: `Match between ${match.team1?.name} and ${match.team2?.name} in the ICC Men’s T20 World Cup 2026.`,
    startDate: startDateISO,
    endDate: startDateISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Cricket",
    image: `${siteUrl}/assets/worldcup-2026-cover.jpeg`,

    location: match.venue
      ? {
          "@type": "Place",
          name: match.venue,
        }
      : undefined,

    competitor: [
      { "@type": "SportsTeam", name: match.team1?.name },
      { "@type": "SportsTeam", name: match.team2?.name },
    ],

    organizer: {
      "@type": "Organization",
      name: "International Cricket Council",
      url: "https://www.icc-cricket.com",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default MatchSchema;
