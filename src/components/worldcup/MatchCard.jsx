import { formatMatchDate } from "../../utils/formatMatchDate";
import { getFlagUrl } from "../../utils/flagCode";
import MatchSchema from "../../seo/MatchSchema";

const TeamBlock = ({ team, alignRight = false }) => {
  const flagUrl = getFlagUrl(team.short);

  return (
    <div className={`wc-team ${alignRight ? "right" : ""}`}>
      {!alignRight &&
        (flagUrl ? (
          <img src={flagUrl} alt={team.name} />
        ) : (
          <span className="tbc-badge">TBC</span>
        ))}

      <span>{team.name}</span>

      {alignRight &&
        (flagUrl ? (
          <img src={flagUrl} alt={team.name} />
        ) : (
          <span className="tbc-badge">TBC</span>
        ))}
    </div>
  );
};

const MatchCard = ({ match }) => {
  return (
    <>
      <MatchSchema match={match} />
      <div className="wc-card">
        {/* Header */}
        <div className="wc-header">
          <span>{formatMatchDate(match.date)}</span>
          <span className="wc-chip">{match.group}</span>
        </div>

        {/* Teams Row */}
        <div className="wc-row">
          <TeamBlock team={match.team1} />

          <span className="wc-vs-badge">v/s</span>

          <TeamBlock team={match.team2} alignRight />
        </div>

        {/* Footer */}
        <div className="wc-footer">
          {match.time?.IST} • {match.venue}
        </div>
      </div>
    </>
  );
};

export default MatchCard;
