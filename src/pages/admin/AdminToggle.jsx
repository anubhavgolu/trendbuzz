export default function AdminToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-5 py-2 rounded-full font-semibold transition
        ${enabled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
    >
      {enabled ? "LIVE 🔥" : "OFF ❌"}
    </button>
  );
}
