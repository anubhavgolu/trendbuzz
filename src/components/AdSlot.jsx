import { useEffect, useRef } from "react";

export default function AdSlot() {
  const adRef = useRef(null);
  const loadedRef = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadedRef.current) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            loadedRef.current = true;
          } catch {}
        }
      },
      { rootMargin: "200px" }
    );

    if (import.meta.env.DEV || !adRef.current) return;

    observer.observe(adRef.current);
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      {/* FIXED HEIGHT TO PREVENT CLS */}
      <div ref={adRef} className="w-full max-w-[728px] min-h-[90px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="horizontal"
        />
      </div>
    </div>
  );
}
