import { useEffect, useRef } from "react";

export default function AdSlot() {
  const adRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV || !adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadedRef.current) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            loadedRef.current = true;
            observer.disconnect(); 
          } catch (e) {
            console.error("AdSense error", e);
          }
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center my-6">

      <div
        ref={adRef}
        className="w-full max-w-[728px]"
        style={{ minHeight: "280px" }} 
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          data-ad-client="ca-pub-1788108525667414"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
