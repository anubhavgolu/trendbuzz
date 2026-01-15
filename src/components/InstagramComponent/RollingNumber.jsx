import { useEffect, useState } from "react";

export default function RollingNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (typeof value !== "number") return;

    let start = 0;
    const end = value;
    const duration = 700;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className="tabular-nums">
      {display.toLocaleString()}
    </span>
  );
}
