export default function ComparisonTable({ a, b }) {
  const rows = [
    ["Followers", a.followers, b.followers],
    ["Posts", a.posts, b.posts],
    ["Engagement %", a.engagementRate, b.engagementRate],
    ["Avg Likes", a.avgLikes, b.avgLikes],
  ];

  return (
    <div className="bg-white rounded-xl p-6 mt-8 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Metric</th>
            <th>@{a.username}</th>
            <th>@{b.username}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, v1, v2]) => (
            <tr key={k} className="border-t">
              <td className="py-2 font-medium">{k}</td>
              <td>{v1}</td>
              <td>{v2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
