import { useEffect, useState } from "react";
import { fetchSchedule } from "../../../services/worldcup.api";
import MatchCard from "../../../components/worldcup/MatchCard";
import DateHeader from "../../../components/worldcup/DateHeader";
import { groupMatchesByDate } from "../../../utils/groupMatchesByDate";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import BreadcrumbSchema from "../../../components/BreadcrumbSchema";

const Schedule = () => {
  const [grouped, setGrouped] = useState({});
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");

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

    const groupedData = groupMatchesByDate(filtered);
    setGrouped(groupedData);
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
        title="ICC Men’s T20 World Cup 2026 Schedule | TrendBuzzs"
        description="Date-wise full schedule of ICC Men’s T20 World Cup 2026 with match timings, venues and group details."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/schedule"
        pageType="Schedule"
      />

      <div className="wc-heading">
        <h1>ICC Men’s T20 World Cup 2026 Schedule</h1>
        <p>
          Full match schedule with date-wise fixtures, venues and match timings
        </p>

        <WorldCupTabs />

        <p className="wc-editorial">
          The ICC Men’s T20 World Cup 2026 brings together the world’s top
          cricket teams competing across multiple venues in India and Sri Lanka.
          Below is the complete date-wise schedule featuring match fixtures,
          timings, venues and group details.
        </p>

        <input
          type="text"
          placeholder="Search team (e.g. India, Pakistan, England)"
          className="wc-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="wc-page">
        {Object.keys(grouped).length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No matches found
          </p>
        )}

        {Object.entries(grouped).map(([date, matches], idx) => (
          <div key={date} className="wc-date-group">
            <DateHeader label={date} />

            {matches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href="/sports/t20-world-cup-2026/points-table"
          style={{ color: "#9a3412", fontWeight: 600 }}
        >
          View ICC Men’s T20 World Cup 2026 Points Table →
        </a>
      </div>
    </>
  );
};

export default Schedule;
