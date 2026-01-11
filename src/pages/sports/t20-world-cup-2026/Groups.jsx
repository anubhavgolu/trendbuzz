import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import GroupCard from "../../../components/worldcup/GroupCard";
import { WORLD_CUP_GROUPS } from "../../../data/worldcupGroups";
import WorldCupSEO from "../../../seo/WorldCupSEO";

const Groups = () => {
  return (
    <>
      <WorldCupSEO
        title="ICC Men’s T20 World Cup 2026 Groups | TrendBuzzs"
        description="Group-wise teams of ICC Men’s T20 World Cup 2026."
        url="https://trendbuzzs.com/sports/t20-world-cup-2026/groups"
        pageType="Groups"

      />

      <div className="wc-heading">
        <h1>ICC Men’s T20 World Cup 2026 Groups</h1>
        <p>Group-wise teams participating in the tournament</p>
      </div>

      <WorldCupTabs />

      <div className="wc-page">
        {WORLD_CUP_GROUPS.map((group) => (
          <div key={group.name} className="wc-date-group">
            <GroupCard group={group} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups;
