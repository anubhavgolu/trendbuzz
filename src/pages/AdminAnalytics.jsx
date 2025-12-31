import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import DailyVisitsChart from "../components/charts/DailyVisitsChart";
import DevicePie from "../components/charts/DevicePie";
import {
  fetchAdminStats,
  fetchDailyAnalytics,
} from "../services/adminApi";
import { socket } from "../services/socket";

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [daily, setDaily] = useState([]);

  // 🔴 LIVE ANALYTICS
  const [liveUsers, setLiveUsers] = useState(0);
  const [livePages, setLivePages] = useState({});

  // 🔥 SOCKET LISTENER
  useEffect(() => {
    socket.on("live-update", (data) => {
      setLiveUsers(data.users || 0);
      setLivePages(data.pages || {});
    });

    return () => socket.off("live-update");
  }, []);

  // 🔵 FETCH STATS
  useEffect(() => {
    fetchAdminStats().then(setStats);
    fetchDailyAnalytics().then(setDaily);
  }, []);

  if (!stats) return <p className="p-10">Loading analytics…</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-24">
      <h1 className="text-3xl font-extrabold mb-8">
        📊 Admin Analytics
      </h1>

      {/* 🔴 LIVE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="🟢 Live Users" value={liveUsers} />

        <div className="bg-white border rounded-xl p-5 md:col-span-2">
          <h3 className="font-bold mb-3">📄 Live Pages</h3>

          {Object.keys(livePages).length === 0 ? (
            <p className="text-sm text-gray-500">
              No active pages right now
            </p>
          ) : (
            <div className="space-y-1 text-sm">
              {Object.entries(livePages).map(([page, count]) => (
                <div
                  key={page}
                  className="flex justify-between text-gray-700"
                >
                  <span>{page}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🟣 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Visits" value={stats.totalVisits} />
        <StatCard
          title="Unique Visitors"
          value={stats.uniqueVisitors}
        />
        <StatCard title="Top Country" value={stats.topCountry} />
        <StatCard
          title="Mobile Visits"
          value={
            stats.deviceStats.find((d) => d._id === "mobile")
              ?.count || 0
          }
        />
      </div>

      {/* 📈 CHARTS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <DailyVisitsChart data={daily} />
        <DevicePie data={stats.deviceStats} />
      </div>
    </div>
  );
}
