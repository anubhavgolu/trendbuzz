import { useRef } from "react";
import { hapticTap } from "../utils/haptics";

export default function TrendingTabs({ sections = [], active, onChange }) {
  const startX = useRef(0);

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    if (Math.abs(diff) < 50) return;

    const index = sections.findIndex((s) => s === active);
    if (diff < 0 && index < sections.length - 1) {
      onChange(sections[index + 1]);
    }
    if (diff > 0 && index > 0) {
      onChange(sections[index - 1]);
    }
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="sticky top-14 z-40 bg-white border-b"
    >
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => {
              hapticTap();
              onChange(section);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                active === section
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
