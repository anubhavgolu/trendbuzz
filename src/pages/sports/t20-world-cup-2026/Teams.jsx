import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import WorldCupFAQSchema from "../../../seo/WorldCupFAQSchema";

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
        title="ICC T20 World Cup 2026 Teams (Complete Teams List)"
        description="Complete list of all teams participating in the ICC T20 World Cup 2026. View qualified teams with country flags listed alphabetically."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/teams"
        pageType="Teams"
      />

      <div className="wc-heading">
        <h1>ICC T20 World Cup 2026 Teams</h1>
        <p className="wc-updated">
          Official list of all participating teams (alphabetical order)
        </p>
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
                    alt={`${team.name} team flag`}
                    loading="lazy"
                  />
                  <span>{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <WorldCupFAQSchema page="teams" />
    </>
  );
};

export default Teams;
