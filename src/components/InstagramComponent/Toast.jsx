import { useEffect } from "react";

export default function Toast({ message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-[14rem] sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max">
      <div className="bg-black text-white px-5 py-3 rounded-full shadow-lg text-sm text-center">
        {message}
      </div>
    </div>
  );
}
