const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchSchedule = async () => {
  const res = await fetch(`${API_BASE}/api/worldcup/schedule`);
  return res.json();
};

export const fetchPointsTable = async () => {
  const res = await fetch(`${API_BASE}/api/worldcup/points-table`);
  return res.json();
};
