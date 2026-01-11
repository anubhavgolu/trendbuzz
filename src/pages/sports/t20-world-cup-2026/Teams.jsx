import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import WorldCupSEO from "../../../seo/WorldCupSEO";

import { WORLD_CUP_TEAMS } from "../../../data/worldcupTeams";
import { groupTeamsAlphabetically } from "../../../utils/groupTeamsAlphabetically";
import { getFlagUrl } from "../../../utils/flagCode";

const groupedTeams = groupTeamsAlphabetically(
  WORLD_CUP_TEAMS.sort((a, b) => a.name.localeCompare(b.name))
);

const Teams = () => {
  return (
    <>
      <WorldCupSEO
        title="ICC Men’s T20 World Cup 2026 Teams | TrendBuzzs"
        description="Complete list of teams participating in ICC Men’s T20 World Cup 2026."
        url="https://trendbuzzs.com/sports/t20-world-cup-2026/teams"
        pageType="Teams"

      />

      <div className="wc-heading">
        <h1>ICC Men’s T20 World Cup 2026 Teams</h1>
        <p>All participating teams listed alphabetically</p>
      </div>

      <WorldCupTabs />

      <div className="wc-page">
        {Object.entries(groupedTeams).map(([letter, teams]) => (
          <div key={letter} className="wc-date-group">
            <div className="wc-date-header">{letter}</div>

            <div className="wc-teams-grid">
              {teams.map((team) => (
                <div key={team.short} className="wc-team-card">
                  <img
                    src={getFlagUrl(team.short)}
                    alt={team.name}
                  />
                  <span>{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teams;
