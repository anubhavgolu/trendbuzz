import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import Toast from "./Toast";
import { API_BASE } from "../../services/http";

const examples = ["virat.kohli", "cristiano", "leomessi"];

export default function SingleAnalyzer() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // 🔁 Auto-typing placeholder
  useEffect(() => {
    let i = 0;
    let char = 0;
    const interval = setInterval(() => {
      setPlaceholder(examples[i].slice(0, char));
      char++;
      if (char > examples[i].length) {
        char = 0;
        i = (i + 1) % examples.length;
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  async function analyze(e) {
    e.preventDefault();

    if (!username.trim()) {
      setToast("⚠️ Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const clean = username
        .trim()
        .replace(/[^a-zA-Z0-9._]/g, "")
        .toLowerCase();

      const res = await fetch(`${API_BASE}/api/instagram/${clean}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_PUBLIC_API_KEY,
        },
      });

      const json = await res.json();

      if (!json.success) {
        setToast("❌ Instagram profile not found or private");
        return;
      }

      setData(json.data);

      // ✅ 🔥 SAVE SEARCH (ONLY AFTER SUCCESS)
      fetch(`${API_BASE}/api/search-log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: clean,
          mode: "single",
        }),
      }).catch(() => {});
    } catch {
      setToast("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={analyze} className="bg-white rounded-xl p-6 shadow mb-8">
        <h2 className="text-xl font-bold text-center mb-4">
          Analyze Instagram Profile
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={username}
            onFocus={() => setPlaceholder("")}
            onChange={(e) => {
              setUsername(e.target.value);
              setToast("");
            }}
            placeholder={placeholder}
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </form>

      {data && <ProfileCard data={data} id="single-card" />}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}
