import { NavLink } from "react-router-dom";
import { hapticTap } from "../utils/haptics";
import { HiHome, HiInformationCircle } from "react-icons/hi2";
import { MdTrendingUp } from "react-icons/md";
import { GiCricketBat } from "react-icons/gi";

export default function MobileBottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center text-xs font-medium
     ${isActive ? "text-orange-600" : "text-gray-500"}`;

  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="h-14 flex items-center justify-around">
        <NavLink to="/" className={linkClass} onClick={hapticTap}>
          <HiHome className="text-xl" />
          Home
        </NavLink>

        <NavLink to="/trending" className={linkClass} onClick={hapticTap}>
          <MdTrendingUp className="text-xl" />
          Trending
        </NavLink>

        {/* 🏏 T20 CRICKET */}
        <NavLink
          to="/sports/t20-world-cup-2026/schedule"
          className={linkClass}
          onClick={hapticTap}
        >
          <GiCricketBat className="text-xl" />
          T20
        </NavLink>

        <NavLink to="/about" className={linkClass} onClick={hapticTap}>
          <HiInformationCircle className="text-xl" />
          About
        </NavLink>
      </div>
    </nav>
  );
}
