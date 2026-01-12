import { useEffect, useState } from "react";
import { fetchSchedule } from "../../../services/worldcup.api";
import MatchCard from "../../../components/worldcup/MatchCard";
import DateHeader from "../../../components/worldcup/DateHeader";
import { groupMatchesByDate } from "../../../utils/groupMatchesByDate";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import WorldCupFAQSchema from "../../../seo/WorldCupFAQSchema";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import BreadcrumbSchema from "../../../components/BreadcrumbSchema";

const Schedule = () => {
  const [grouped, setGrouped] = useState({});
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    fetchSchedule().then((res) => {
      if (res.success) {
        setMatches(res.data);
      }
    });
  }, []);

  useEffect(() => {
    let filtered = matches;

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = matches.filter(
        (m) =>
          m.team1.name.toLowerCase().includes(q) ||
          m.team2.name.toLowerCase().includes(q)
      );
    }

    setGrouped(groupMatchesByDate(filtered));
  }, [search, matches]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.trendbuzzs.com/" },
          { name: "Sports", url: "https://www.trendbuzzs.com/sports" },
          {
            name: "ICC Men’s T20 World Cup 2026",
            url: "https://www.trendbuzzs.com/sports/t20-world-cup-2026/schedule",
          },
          {
            name: "Schedule",
            url: "https://www.trendbuzzs.com/sports/t20-world-cup-2026/schedule",
          },
        ]}
      />

      <WorldCupSEO
        title="T20 World Cup 2026 Schedule, Fixtures, Dates & Venues | ICC Men’s T20 WC"
        description="Check the complete T20 World Cup 2026 schedule with match fixtures, dates, venues, teams, group stage matches, semi-finals and final details. Updated daily."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/schedule"
        pageType="Schedule"
      />

      {/* ===== HERO ===== */}
      <div className="wc-heading">
        <h1>ICC Men’s T20 World Cup 2026 Schedule</h1>
        <p>
          Full match schedule with date-wise fixtures, venues and match timings
        </p>

        <WorldCupTabs />

        {/* SEARCH FIRST (UX WIN) */}
        <input
          type="text"
          placeholder="Search team (e.g. India, Pakistan, England)"
          className="wc-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SEO TOGGLE */}
        <button
          onClick={() => setShowSeo(!showSeo)}
          className="wc-about-toggle"
        >
          i
        </button>

        <section className={`wc-seo-content ${showSeo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Match Schedule & Fixtures</h2>
          <p>
            The ICC Men’s T20 World Cup 2026 schedule includes group stage
            matches, Super 12 fixtures, semi-finals and the final. Teams like
            India, Pakistan, Australia, England and New Zealand will compete
            across venues in India and Sri Lanka.
          </p>

          <h2>T20 World Cup 2026 Group Stage Schedule</h2>
          <p>
            The group stage of the T20 World Cup 2026 features multiple matches
            played daily across different cities. Each team plays several group
            matches before advancing to the knockout rounds.
          </p>

          <h2>T20 World Cup 2026 Semi-Final and Final Dates</h2>
          <p>
            The semi-finals and final of the ICC Men’s T20 World Cup 2026 are
            expected to be played in major stadiums, with millions of fans
            watching worldwide.
          </p>
        </section>
      </div>

      {/* ===== SCHEDULE ===== */}
      <div className="wc-page">
        {Object.keys(grouped).length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No matches found
          </p>
        )}

        {Object.entries(grouped).map(([date, matches]) => (
          <div key={date} className="wc-date-group">
            <DateHeader label={date} />
            {matches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        ))}
      </div>

      {/* ===== INTERNAL LINK ===== */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href="/sports/t20-world-cup-2026/points-table"
          style={{ color: "#9a3412", fontWeight: 600 }}
        >
          View ICC Men’s T20 World Cup 2026 Points Table →
        </a>
      </div>
      <WorldCupFAQSchema />
    </>
  );
};

export default Schedule;
