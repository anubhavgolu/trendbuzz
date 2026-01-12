import { useState } from "react";
import WorldCupTabs from "../../../components/worldcup/WorldCupTabs";
import GroupCard from "../../../components/worldcup/GroupCard";
import { WORLD_CUP_GROUPS } from "../../../data/worldcupGroups";
import WorldCupSEO from "../../../seo/WorldCupSEO";
import WorldCupFAQSchema from "../../../seo/WorldCupFAQSchema";

const Groups = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <WorldCupSEO
        title="T20 World Cup 2026 Groups | ICC Men’s T20 WC Group-wise Teams"
        description="Complete group-wise list of teams participating in the ICC Men’s T20 World Cup 2026. View Group A, Group B, Group C and Group D details."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/groups"
        pageType="Groups"
      />

      <div className="wc-heading">
        <h1>
          ICC Men’s T20 World Cup 2026 Groups
          <button
            className="wc-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="About groups"
            title="About groups"
          >
            i
          </button>
        </h1>
        <p>Group-wise teams participating in the tournament</p>
        <section className={`wc-seo-content ${showInfo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Groups Explained</h2>
          <p>
            The ICC Men’s T20 World Cup 2026 features multiple groups with top
            international teams competing for qualification into the knockout
            stages. Each team plays group-stage matches to earn points.
          </p>

          <h2>How Teams Qualify from Groups</h2>
          <p>
            The top teams from each group advance to the semi-finals based on
            points earned. In case of equal points, net run rate (NRR) is used
            to decide the final standings.
          </p>
        </section>
      </div>

      <WorldCupTabs />

      <div className="wc-page">
        {WORLD_CUP_GROUPS.map((group) => (
          <div key={group.name} className="wc-date-group">
            <GroupCard group={group} />
          </div>
        ))}
      </div>

      <WorldCupFAQSchema />
    </>
  );
};

export default Groups;
