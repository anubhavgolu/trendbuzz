import { API_BASE } from "./http";

export async function fetchSection(section) {
  const res = await fetch(`${API_BASE}/api/content/section/${section}`);
  return res.json();
}

export async function fetchBySlug(slug) {
  const res = await fetch(`${API_BASE}/api/content/${slug}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}
