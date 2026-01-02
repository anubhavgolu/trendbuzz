import { useEffect, useState } from "react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-20 inset-x-4 z-40 bg-white border rounded-xl shadow-lg p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold text-gray-900">Install TrendBuzzs</p>
        <p className="text-xs text-gray-500">
          Get faster access & offline reading
        </p>
      </div>
      <button
        onClick={install}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Install
      </button>
    </div>
  );
}
