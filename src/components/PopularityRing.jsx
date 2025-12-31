import { useEffect, useState } from "react";

export default function PopularityRing({
  score,
  max = 10000,
  size = 52,
  stroke = 5,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalized = Math.min(score / max, 1);
  const offset = circumference * (1 - normalized);

  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setDashOffset(offset)
    );
    return () => cancelAnimationFrame(id);
  }, [offset]);

  // 🔥 Color logic
  const color =
    score > 7000
      ? "#EF4444" // red
      : score > 4000
      ? "#F97316" // orange
      : "#EAB308"; // yellow

  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Popularity score ${score}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 700ms ease-out",
          }}
        />

        {/* Center text */}
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="600"
          fill="#111827"
        >
          {Math.round(normalized * 100)}%
        </text>
      </svg>

      <div className="text-xs leading-tight">
        <p className="text-gray-500">Popularity</p>
        <p className="font-semibold text-gray-900">{score}</p>
      </div>
    </div>
  );
}
