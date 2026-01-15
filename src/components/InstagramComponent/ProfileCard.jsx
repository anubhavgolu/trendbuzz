import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import Toast from "./Toast";
import RollingNumber from "./RollingNumber";

export default function ProfileCard({ data, id, winner }) {
  const [toast, setToast] = useState("");

  if (!data) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow">
        Profile not available
      </div>
    );
  }

  const isWinner = winner === data.username;

  async function downloadImage() {
    try {
      const element = document.getElementById(id);
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `instagram-${data.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setToast("📥 Card downloaded");
    } catch {
      setToast("❌ Download failed");
    }
  }

  async function shareProfile() {
    try {
      await navigator.clipboard.writeText(
        `https://www.instagram.com/${data.username}`
      );
      setToast("🔗 Profile link copied");
    } catch {
      setToast("❌ Unable to copy link");
    }
  }

  return (
    <>
      <div
        id={id}
        className={`relative bg-white rounded-2xl
  p-6 md:p-8
  w-full max-w-xl mx-auto
  border transition shadow-md hover:shadow-xl
  ${isWinner ? "border-orange-400 ring-2 ring-orange-400" : "border-orange-200"}
`}
      >
        {/* 🏆 Winner */}
        {/* Avatar + Winner */}
        <div className="relative flex justify-center mb-4">
          {/* 🏆 Winner badge */}
          {isWinner && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
              <span
                className="
          inline-flex items-center gap-1
          bg-orange-500 text-white text-xs font-bold
          px-4 py-1 rounded-full
          shadow-md animate-soft-pulse
        "
              >
                🏆 WINNER
              </span>
            </div>
          )}

          {/* Avatar */}
          <div
            className={`w-24 h-24 rounded-full overflow-hidden border-4 shadow-md
      ${isWinner ? "border-orange-500" : "border-white"}
    `}
          >
            <img
              src={`http://localhost:8080/api/proxy/image?url=${encodeURIComponent(
                data.profilePic
              )}`}
              alt={data.username}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Name */}
        <div className="mt-2 text-center">
          <h2 className="text-xl font-bold text-gray-900">@{data.username}</h2>
          <p className="text-sm text-gray-500">Public Instagram Profile</p>
        </div>
        {data.biography && (
          <div className="mt-4 text-sm text-gray-700 text-center">
            <span className="block font-semibold text-gray-900 mb-1">Bio</span>
            <p className="whitespace-pre-line">{data.biography}</p>
          </div>
        )}

        {data.bioLinks?.length > 0 && (
          <div className="mt-3 text-center">
            <span className="block text-xs font-semibold text-gray-500 mb-1">
              Bio Links
            </span>

            <div className="flex flex-wrap gap-2 justify-center">
              {data.bioLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-orange-600 underline hover:text-orange-700"
                >
                  {l.title || "Link"}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <Stat label="Posts" value={data.posts} />
          <Stat label="Followers" value={data.followers} />
          <Stat label="Following" value={data.following} />
        </div>

        {/* Analytics */}
        <div className="mt-5 text-sm text-gray-700 space-y-1">
          <p>
            <b>Engagement:</b>{" "}
            {data.engagementRate === "0.00%" || data.engagementRate === "N/A"
              ? "N/A (Low activity)"
              : data.engagementRate}
          </p>
          <p>
            <b>Content:</b> {data.contentType}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:max-w-md mx-auto">
          <button
            onClick={shareProfile}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
          >
            Share
          </button>
          <button
            onClick={downloadImage}
            className="flex-1 border border-orange-500 text-orange-600 py-2 rounded-lg font-semibold hover:bg-orange-50"
          >
            Download
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}

/* 🔢 STAT with RAW ↔ K/M toggle */

function Stat({ label, value }) {
  const [short, setShort] = useState(false);

  useEffect(() => {
    setShort(window.innerWidth < 640);
  }, []);

  function shortFormat(v) {
    if (v == null) return "-";
    if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
    return v;
  }

  return (
    <div
      onClick={() => setShort(!short)}
      className="cursor-pointer text-center select-none"
    >
      <div className="text-lg font-bold text-gray-900 min-h-[28px]">
        {short ? shortFormat(value) : <RollingNumber value={value} />}
      </div>

      <div className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>
    </div>
  );
}
