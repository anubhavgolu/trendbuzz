import { useState } from "react";

const tabs = [
  { label: "ALL", value: "all" },
  { label: "Reddit", value: "reddit" },
  { label: "NASA", value: "nasa" },
  { label: "Most Popular Today", value: "popular-today" },
];

export default function TrendingNow({ onChange }) {
  const [activeTab, setActiveTab] = useState("all");

  function handleClick(tab) {
    setActiveTab(tab.value);
    onChange?.(tab.value);
  }

  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Trending Now
      </h2>

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleClick(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${
                activeTab === tab.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
              }`}
          >
            {tab.label}
            {tab.value === "popular-today" &&
              activeTab === tab.value &&
              " 🔥"}
          </button>
        ))}
      </div>
    </div>
  );
}
