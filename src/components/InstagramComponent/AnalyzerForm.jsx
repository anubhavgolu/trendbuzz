import { useState } from "react";

export default function AnalyzerForm({ onAnalyze, loading }) {
  const [username, setUsername] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    onAnalyze(username.trim());
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow p-6 flex gap-3"
    >
      <input
        type="text"
        placeholder="Enter Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 rounded-lg font-medium disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}
