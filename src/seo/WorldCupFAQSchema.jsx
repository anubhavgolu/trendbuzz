import { Helmet } from "react-helmet-async";

const WorldCupFAQSchema = ({ page }) => {
  const scheduleFAQ = [
    {
      "@type": "Question",
      name: "When does the ICC T20 World Cup 2026 start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ICC T20 World Cup 2026 is scheduled to begin in February 2026 with matches played in India and Sri Lanka.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find the full T20 World Cup 2026 schedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The complete T20 World Cup 2026 schedule is available with date-wise fixtures, venues and match timings on this page.",
      },
    },
    {
      "@type": "Question",
      name: "How many matches are played in T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ICC T20 World Cup 2026 features multiple group stage and knockout matches including semi-finals and the final.",
      },
    },
    {
      "@type": "Question",
      name: "Are match timings updated in the T20 World Cup 2026 schedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, match timings and fixtures are updated regularly as per official announcements.",
      },
    },
  ];

  const pointsFAQ = [
    {
      "@type": "Question",
      name: "How is the T20 World Cup 2026 points table calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The points table is calculated based on matches played, wins, losses, no results, points and net run rate (NRR).",
      },
    },
    {
      "@type": "Question",
      name: "How many teams qualify from the points table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Top teams from each group qualify for the knockout stage based on points and net run rate.",
      },
    },
    {
      "@type": "Question",
      name: "Is the points table updated live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the points table is updated after every match with the latest standings.",
      },
    },
  ];
  const groupsFAQ = [
    {
      "@type": "Question",
      name: "How many groups are there in T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ICC T20 World Cup 2026 features multiple groups, with teams divided to compete in the group stage.",
      },
    },
    {
      "@type": "Question",
      name: "Which teams are in Group A of T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Group A of the ICC T20 World Cup 2026 includes top international teams as announced by the ICC.",
      },
    },
    {
      "@type": "Question",
      name: "How do teams qualify from groups in T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teams qualify from the group stage based on points earned and net run rate (NRR).",
      },
    },
    {
      "@type": "Question",
      name: "Are T20 World Cup 2026 groups officially confirmed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the groups for the ICC T20 World Cup 2026 are announced officially by the ICC and updated if changes occur.",
      },
    },
  ];
  const teamsFAQ = [
    {
      "@type": "Question",
      name: "How many teams are playing in ICC T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A total of 20 international teams are participating in the ICC T20 World Cup 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Which teams have qualified for T20 World Cup 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ICC T20 World Cup 2026 features top international teams that have qualified through rankings and qualifiers.",
      },
    },
    {
      "@type": "Question",
      name: "Is this the final list of T20 World Cup 2026 teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this page shows the officially announced teams for the ICC T20 World Cup 2026. Any updates will be reflected here.",
      },
    },
    {
      "@type": "Question",
      name: "Are teams listed alphabetically on this page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all ICC T20 World Cup 2026 teams are listed alphabetically for easy navigation.",
      },
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      page === "schedule"
        ? scheduleFAQ
        : page === "groups"
          ? groupsFAQ
          : page === "teams"
            ? teamsFAQ
            : pointsFAQ,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default WorldCupFAQSchema;
