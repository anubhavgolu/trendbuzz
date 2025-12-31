import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#f97316", "#0ea5e9"];

export default function DevicePie({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-bold mb-4">📱 Device Split</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
