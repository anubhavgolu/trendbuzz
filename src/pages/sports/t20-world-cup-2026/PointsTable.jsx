import { useEffect, useState } from "react";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import { fetchPointsTable } from "../../../services/worldcup.api";
import { getFlagUrl } from "../../../utils/flagCode";

const PointsTable = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchPointsTable().then((res) => {
      if (res.success) setGroups(res.data);
    });
  }, []);

  return (
    <>
      <WorldCupSEO
        title="ICC Men’s T20 World Cup 2026 Points Table | TrendBuzzs"
        description="Latest group-wise points table of ICC Men’s T20 World Cup 2026."
        url="https://trendbuzzs.com/sports/t20-world-cup-2026/points-table"
        pageType="Points Table"

      />

      <div className="wc-heading">
        <h1>ICC Men’s T20 World Cup 2026 Points Table</h1>
        <p>Group-wise standings with matches, points and net run rate</p>
      </div>

      <WorldCupTabs />

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
                  {group.table.map((team, idx) => (
                    <tr key={team.short}>
                      <td className="team-name">
                        <img
                          src={getFlagUrl(team.short)}
                          alt={team.team}
                          className="team-flag"
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
    </>
  );
};

export default PointsTable;
