import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function DailyVisitsChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-bold mb-4">📈 Daily Visits</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="visits" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
