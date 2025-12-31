import { API_BASE } from "./http";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
/* ---------------- ADMIN STATS ---------------- */
export async function fetchAdminStats() {
  if (!ADMIN_KEY) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/stats`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });

  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return res.json();
}

/* ---------------- DAILY ANALYTICS ---------------- */
export async function fetchDailyAnalytics() {
  if (!ADMIN_KEY) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/daily`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });

  if (!res.ok) throw new Error("Failed to fetch daily analytics");
  return res.json();
}

/* ---------------- MANUAL NEWS ---------------- */
export async function getActiveManualNews() {
  const res = await fetch(`${API_BASE}/api/manual-news/active`);
  return res.json();
}

export async function updateManualNews(payload) {
  const res = await fetch(`${API_BASE}/api/manual-news/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function toggleManualNews() {
  const res = await fetch(`${API_BASE}/api/manual-news/toggle`, {
    method: "POST",
  });
  return res.json();
}
