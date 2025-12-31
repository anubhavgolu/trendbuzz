export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">
        {value}
      </p>
    </div>
  );
}
