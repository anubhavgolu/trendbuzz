import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackClick } from "../services/heatmap";

export default function ClickTracker() {
  const location = useLocation();

  useEffect(() => {
    function handleClick(e) {
      const x = Math.round(
        (e.clientX / window.innerWidth) * 100
      );
      const y = Math.round(
        (e.clientY / window.innerHeight) * 100
      );

      trackClick(location.pathname, x, y);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname]);

  return null;
}
