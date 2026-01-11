import { getFlagUrl } from "../../utils/flagCode";

const GroupCard = ({ group }) => {
  return (
    <div className="wc-group-card">
      <div className="wc-group-header">{group.name}</div>

      <div className="wc-group-teams">
        {group.teams.map((team) => (
          <div key={team.short} className="wc-group-team">
            <img
              src={getFlagUrl(team.short)}
              alt={team.name}
            />
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
