import { useEffect, useState } from "react";
import { fetchSchedule } from "../../../services/worldcup.api";
import MatchCard from "../../../components/worldcup/MatchCard";
import DateHeader from "../../../components/worldcup/DateHeader";
import { groupMatchesByDate } from "../../../utils/groupMatchesByDate";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import WorldCupFAQSchema from "../../../seo/WorldCupFAQSchema";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import BreadcrumbSchema from "../../../components/BreadcrumbSchema";
import ScheduleSkeleton from "../../../components/skeletons/worldcup/ScheduleSkeleton";

const Schedule = () => {
  const [grouped, setGrouped] = useState({});
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasFetched(false);

    fetchSchedule().then((res) => {
      if (res.success) setMatches(res.data);
      else setMatches([]);

      setLoading(false);
      setHasFetched(true);
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
        title="ICC T20 World Cup 2026 Schedule (Fixtures, Dates & Venues)"
        description="Complete ICC T20 World Cup 2026 schedule with date-wise fixtures, match timings, venues, group stage matches, semi-finals and final. Updated daily."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/schedule"
        pageType="Schedule"
      />

      <div className="wc-heading">
        <h1>ICC T20 World Cup 2026 Schedule</h1>
        <p>
          Date-wise match fixtures with venues, timings and team details
        </p>

        <WorldCupTabs />

        <input
          type="text"
          placeholder="Search team (India, Pakistan, Australia, England)"
          className="wc-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowSeo(!showSeo)}
          className="wc-about-toggle"
          aria-label="About schedule"
        >
          i
        </button>

        <section className={`wc-seo-content ${showSeo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Schedule & Fixtures</h2>
          <p>
            The ICC T20 World Cup 2026 schedule includes group stage matches,
            knockout fixtures, semi-finals and the final. Matches will be played
            across multiple venues in India and Sri Lanka.
          </p>

          <h2>T20 World Cup 2026 Group Stage Schedule</h2>
          <p>
            During the group stage, all participating teams compete in
            round-robin matches. Each team plays multiple matches to qualify for
            the knockout stage based on points and net run rate.
          </p>

          <h2>Semi-Final and Final Schedule – T20 World Cup 2026</h2>
          <p>
            The semi-finals and final of the ICC T20 World Cup 2026 will be held
            in major international stadiums with global broadcast coverage.
          </p>
        </section>
      </div>

      <div className="wc-page">
        {loading ? (
          <ScheduleSkeleton />
        ) : Object.keys(grouped).length === 0 && hasFetched ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No matches found
          </p>
        ) : (
          Object.entries(grouped).map(([date, matches]) => (
            <div key={date} className="wc-date-group">
              <DateHeader label={date} />
              {matches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href="/sports/t20-world-cup-2026/points-table"
          style={{ color: "#9a3412", fontWeight: 600 }}
        >
          View ICC T20 World Cup 2026 Points Table →
        </a>
      </div>

      <WorldCupFAQSchema page="schedule" />
    </>
  );
};

export default Schedule;
