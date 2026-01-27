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
        title="ICC T20 World Cup 2026 Groups (Group-wise Teams List)"
        description="ICC T20 World Cup 2026 groups with complete group-wise teams list. Check Group A, Group B, Group C and Group D teams and qualification format."
        url="https://www.trendbuzzs.com/sports/t20-world-cup-2026/groups"
        pageType="Groups"
      />

      <div className="wc-heading">
        <h1>
          ICC T20 World Cup 2026 Groups
          <button
            className="wc-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="About groups"
            title="About groups"
          >
            i
          </button>
        </h1>

        <p className="wc-updated">
          Official group-wise teams participating in the tournament
        </p>

        <section className={`wc-seo-content ${showInfo ? "open" : ""}`}>
          <h2>T20 World Cup 2026 Groups Explained</h2>
          <p>
            The ICC T20 World Cup 2026 is divided into multiple groups featuring
            top international teams. Each team competes in the group stage to
            earn points and qualify for the knockout rounds.
          </p>

          <h2>How Teams Qualify from Groups in T20 World Cup 2026</h2>
          <p>
            Teams are ranked within their groups based on points and net run
            rate (NRR). The top-performing teams from each group qualify for the
            knockout stage of the tournament.
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

      <WorldCupFAQSchema page="groups" />
    </>
  );
};

export default Groups;
