import { useRef, useState } from "react";
import { hapticTap } from "../utils/haptics";

const tabs = [
  { key: "tech", label: "🔥 Tech" },
  { key: "news", label: "📰 News" },
  { key: "memes", label: "😂 Memes" },
  { key: "entertainment", label: "🎬 Entertainment" },
];

export default function TrendingTabs({ active, onChange }) {
  const startX = useRef(0);

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    if (Math.abs(diff) < 50) return;

    const index = tabs.findIndex((t) => t.key === active);
    if (diff < 0 && index < tabs.length - 1) {
      onChange(tabs[index + 1].key);
    }
    if (diff > 0 && index > 0) {
      onChange(tabs[index - 1].key);
    }
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="sticky top-14 z-40 bg-white border-b"
    >
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              hapticTap();
              onChange(tab.key);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                active === tab.key
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
