import { API_BASE } from "./http";

export async function upsertContent(payload, adminKey) {
  const res = await fetch(`${API_BASE}/api/content/admin/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}
