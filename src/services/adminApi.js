import { API_BASE } from "./http";


export async function fetchAdminStats(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/stats`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch admin stats");
  }

  return data;
}

export async function fetchDailyAnalytics(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/analytics/daily`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch daily analytics");
  }

  return data;
}


export async function getActiveManualNews() {
  const res = await fetch(`${API_BASE}/api/manual-news/active`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch manual news");
  }

  return data;
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to update manual news");
  }

  return data;
}

export async function toggleManualNews(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/manual-news/toggle`, {
    method: "POST",
    headers: {
      "x-admin-key": adminKey,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to toggle manual news");
  }

  return data;
}


export async function getAdminSections(adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/content/admin/sections`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch admin sections");
  }

  if (!Array.isArray(data)) {
    throw new Error("Invalid admin sections response");
  }

  return data;
}

export async function upsertContent(payload, adminKey) {
  if (!adminKey) throw new Error("Admin key missing");

  const res = await fetch(`${API_BASE}/api/content/admin/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to upsert content");
  }

  return data;
}
