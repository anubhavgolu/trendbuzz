import { useState } from "react";

export default function Stat({ label, value }) {
  const [short, setShort] = useState(false);

  function format(v) {
    if (!short) return v.toLocaleString();
    if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
    return v;
  }

  return (
    <div
      onClick={() => setShort(!short)}
      className="cursor-pointer"
      title="Tap to toggle"
    >
      <p className="text-lg font-bold">{format(value)}</p>
      <p className="text-xs uppercase text-gray-500">{label}</p>
    </div>
  );
}
