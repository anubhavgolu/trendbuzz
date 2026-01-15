import { useState, useEffect } from "react";
import ProfileCard from "../../components/InstagramComponent/ProfileCard";
import CompareSkeleton from "../../components/InstagramComponent/CompareSkeleton";
import Toast from "../../components/InstagramComponent/Toast";
import { pickWinner } from "../../utils/winner";
import { useLocation } from "react-router-dom";
import { API_BASE } from "../../services/http";

export default function InstagramCompare() {
  const [u1, setU1] = useState("");
  const [u2, setU2] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const [toast, setToast] = useState("");
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");

  const examples = [
    ["virat.kohli", "cristiano"],
    ["leomessi", "kyliejenner"],
    ["selenagomez", "neymarjr"],
  ];
  const location = useLocation();

  useEffect(() => {
    setToast("");
  }, [location.pathname]);

  useEffect(() => {
    let i = 0;
    let c = 0;
    const interval = setInterval(() => {
      setPh1(examples[i][0].slice(0, c));
      setPh2(examples[i][1].slice(0, c));
      c++;
      if (c > examples[i][0].length) {
        c = 0;
        i = (i + 1) % examples.length;
      }
    }, 140);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length === 2) {
      setWinner(pickWinner(data[0], data[1]));
    } else {
      setWinner(null);
    }
  }, [data]);

  async function analyze() {
    if (!u1 || !u2) {
      setToast("⚠️ Enter both usernames");
      return;
    }

    setLoading(true);

    const clean = (u) => u.replace(/[^a-zA-Z0-9._]/g, "").toLowerCase();

    const users = [clean(u1), clean(u2)];

    try {
      const results = await Promise.all(
        users.map(async (u) => {
          const res = await fetch(`${API_BASE}/api/instagram/${u}`, {
            headers: {
              "x-api-key": import.meta.env.VITE_PUBLIC_API_KEY,
            },
          });
          const json = await res.json();
          return json.success ? json.data : null;
        })
      );

      const filtered = results.filter(Boolean);
      setData(filtered);
      if (filtered.length === 2) {
        users.forEach((u) => {
          fetch(`${API_BASE}/api/search-log`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: u,
              mode: "compare",
            }),
          }).catch(() => {});
        });
      }
    } catch {
      setToast("❌ Comparison failed");
    } finally {
      setLoading(false);
    }
  }

  async function shareCompare() {
    try {
      const url = `${window.location.origin}/instagram-analyzer?compare=${u1},${u2}`;
      await navigator.clipboard.writeText(url);
      setToast("🔗 Comparison link copied");
    } catch {
      setToast("❌ Unable to copy link");
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 max-w-5xl mx-auto space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Compare Instagram Profiles
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            placeholder={ph1 || "virat.kohli"}
            value={u1}
            onFocus={() => setToast("")}
            onChange={(e) => setU1(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            placeholder={ph2 || "cristiano"}
            value={u2}
            onFocus={() => setToast("")}
            onChange={(e) => setU2(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <button
            onClick={analyze}
            disabled={loading}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 disabled:opacity-60"
          >
            {loading ? "Comparing…" : "Compare"}
          </button>

          <button
            onClick={shareCompare}
            className="rounded-xl border border-orange-400 text-orange-600 font-semibold py-3 hover:bg-orange-50"
          >
            Share
          </button>
        </div>
      </div>

      <div className="bg-gray-50 py-12 mt-10 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {loading && <CompareSkeleton />}

          {!loading && data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.map((profile, i) => (
                <ProfileCard
                  key={profile.username}
                  data={{
                    ...profile,
                    engagementRate:
                      profile.engagementRate === "NaN%"
                        ? "N/A"
                        : profile.engagementRate,
                  }}
                  id={`card-${i}`}
                  winner={winner}
                />
              ))}
            </div>
          )}

          {!loading && data.length === 1 && (
            <p className="text-center text-gray-600">
              One profile could not be analyzed
            </p>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}
