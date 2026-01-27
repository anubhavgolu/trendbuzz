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
        title="ICC T20 World Cup 2026 Points Table (Live Updated Today)"
        description="Latest ICC T20 World Cup 2026 points table with group-wise standings, matches played, wins, losses, net run rate (NRR) and qualification rules."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/points-table"
        pageType="Points Table"
      />

      <div className="wc-heading">
        <h1>
          ICC T20 World Cup 2026 Points Table
          <button
            className="wc-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="About points table"
            title="About points table"
          >
            i
          </button>
        </h1>

        <p className="wc-updated">
          Live updated group-wise standings with points and net run rate
        </p>

        <section className={`wc-seo-content ${showInfo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Points Table Explained</h2>
          <p>
            The ICC T20 World Cup 2026 points table displays group-wise team
            standings based on matches played, wins, losses, total points and
            net run rate (NRR). Teams are ranked according to their performance
            in the group stage.
          </p>

          <h2>How Qualification Works in T20 World Cup 2026</h2>
          <p>
            Teams with the highest points in each group qualify for the knockout
            stage. If teams are tied on points, net run rate (NRR) is used as
            the tie-breaker.
          </p>
        </section>
      </div>

      <WorldCupTabs />

      <div className="wc-page">
        {groups.map((group) => (
          <div key={group._id} className="wc-date-group">
            <div className="wc-date-header">{group.group}</div>

            <div className="wc-table-wrap">
              <table className="wc-points-table">
                <caption>
                  ICC T20 World Cup 2026 {group.group} Points Table
                </caption>

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
                          alt={`${team.team} flag`}
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

      <WorldCupFAQSchema />
    </>
  );
};

export default PointsTable;
