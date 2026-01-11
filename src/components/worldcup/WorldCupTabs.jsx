import { NavLink } from "react-router-dom";

const tabs = [
  {
    label: "Schedule",
    path: "/sports/t20-world-cup-2026/schedule",
  },
  {
    label: "Groups",
    path: "/sports/t20-world-cup-2026/groups",
  },
  {
    label: "Teams",
    path: "/sports/t20-world-cup-2026/teams",
  },
  {
    label: "Points Table",
    path: "/sports/t20-world-cup-2026/points-table",
  },
];

const WorldCupTabs = () => {
  return (
    <div className="wc-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.path}
          className={({ isActive }) =>
            isActive ? "wc-tab active" : "wc-tab"
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default WorldCupTabs;
