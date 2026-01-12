import { useEffect, useState } from "react";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import { fetchPointsTable } from "../../../services/worldcup.api";
import { getFlagUrl } from "../../../utils/flagCode";
import WorldCupFAQSchema from "../../../seo/WorldCupFAQSchema";

const PointsTable = () => {
  const [groups, setGroups] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetchPointsTable().then((res) => {
      if (res.success) setGroups(res.data);
    });
  }, []);

  return (
    <>
      <WorldCupSEO
        title="T20 World Cup 2026 Points Table | ICC Men’s T20 WC Standings"
        description="Latest T20 World Cup 2026 points table with group-wise standings, matches played, wins, losses, net run rate and qualification details."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/points-table"
        pageType="PointsTable"
      />

      {/* ===== HEADER ===== */}
      <div className="wc-heading">
        <h1>
          ICC Men’s T20 World Cup 2026 Points Table
          <button
            className="wc-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="About points table"
            title="About points table"
          >
            i
          </button>
        </h1>
        <p>Group-wise standings with matches, points and net run rate</p>
        <section className={`wc-seo-content ${showInfo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Points Table Explained</h2>
          <p>
            The ICC Men’s T20 World Cup 2026 points table shows team rankings
            based on matches played, wins, losses, net run rate (NRR) and total
            points.
          </p>

          <h2>How Qualification Works</h2>
          <p>
            In case teams finish with equal points, net run rate (NRR) is used
            to decide rankings. The top teams from each group advance to the
            semi-finals.
          </p>
        </section>
      </div>

      <WorldCupTabs />

      {/* ===== INFO (COLLAPSIBLE) ===== */}

      {/* ===== TABLE ===== */}
      <div className="wc-page">
        {groups.map((group) => (
          <div key={group._id} className="wc-date-group">
            <div className="wc-date-header">{group.group}</div>

            <div className="wc-table-wrap">
              <table className="wc-points-table">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>M</th>
                    <th>W</th>
                    <th>L</th>
                    <th>NR</th>
                    <th>NRR</th>
                    <th>Pts</th>
                  </tr>
                </thead>

                <tbody>
                  {group.table.map((team) => (
                    <tr key={team.short}>
                      <td className="team-name">
                        <img
                          src={getFlagUrl(team.short)}
                          alt={team.team}
                          className="team-flag"
                          loading="lazy"
                        />
                        {team.team}
                      </td>
                      <td>{team.matches}</td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>{team.noResult}</td>
                      <td>{team.netRunRate}</td>
                      <td className="pts">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* ===== FAQ SCHEMA (LAST) ===== */}
      <WorldCupFAQSchema />
    </>
  );
};

export default PointsTable;
