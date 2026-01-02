import { API_BASE } from "./http";

/* ---------------- ADMIN STATS ---------------- */

export async function fetchAdminStats(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/stats`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return res.json();
}

/* ---------------- DAILY ANALYTICS ---------------- */

export async function fetchDailyAnalytics(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/daily`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch daily analytics");
  return res.json();
}

/* ---------------- MANUAL NEWS ---------------- */

export async function getActiveManualNews(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/manual-news/active`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch manual news");
  return res.json();
}

export async function updateManualNews(payload, adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/manual-news/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update manual news");
  return res.json();
}

export async function toggleManualNews(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/manual-news/toggle`, {
    method: "POST",
    headers: {
      "x-admin-key": adminKey,
    },
  });

  if (!res.ok) throw new Error("Failed to toggle manual news");
  return res.json();
}
