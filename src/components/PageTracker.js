import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "../services/analytics";
import { socket } from "../services/socket";

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const slug = path.startsWith("/trend/")
      ? path.split("/trend/")[1]
      : null;

    // 🔵 STORE ANALYTICS (DB)
    trackPage(path, slug);

    // 🔴 REAL-TIME SOCKET EVENT
    if (socket.connected) {
      socket.emit("user-active", { page: path });
    }
  }, [location.pathname]);

  return null;
}
