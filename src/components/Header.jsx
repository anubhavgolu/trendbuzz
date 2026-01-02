import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/trendbuzz_logo.png";
import { hapticTap } from "../utils/haptics";

export default function Header() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 🔒 Auto-close on scroll
  useEffect(() => {
    function onScroll() {
      if (open) setOpen(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // 🔑 Close on ESC key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navClass = ({ isActive }) =>
    `relative pb-1 transition-colors
     ${isActive ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}
     after:content-[''] after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:bg-orange-500
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const motion = prefersReducedMotion ? "duration-0" : "duration-300";

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-50 h-14">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center focus:outline-none">
            <img
              src={logo}
              alt="TrendBuzzs home"
              className="h-10 md:h-12 w-auto hover:scale-105 transition"
              decoding="async"
              loading="eager"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="hidden md:flex gap-6 text-sm font-medium"
            aria-label="Primary navigation"
          >
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/search" className={navClass}>
              Search
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </nav>

          {/* BURGER BUTTON */}
          <button
            onClick={() => {
              hapticTap();
              setOpen((v) => !v);
            }}
            className="md:hidden relative w-8 h-8 focus:outline-none"
            aria-label="Main menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {/* Animated lines */}
            <span
              className={`absolute left-1/2 top-1/2 w-6 h-[2px] bg-gray-800 transition-all ${motion}
              ${
                open
                  ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
                  : "-translate-x-1/2 -translate-y-3"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 w-6 h-[2px] bg-gray-800 transition-all ${motion}
              ${open ? "opacity-0" : "-translate-x-1/2 -translate-y-1/2"}`}
            />
            <span
              className={`absolute left-1/2 top-1/2 w-6 h-[2px] bg-gray-800 transition-all ${motion}
              ${
                open
                  ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
                  : "-translate-x-1/2 translate-y-2"
              }`}
            />
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        role="menu"
        className={`fixed top-[56px] inset-x-0 z-50 md:hidden bg-white border-b
        overflow-hidden transition-all ${motion}
        ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="px-4 py-4 space-y-3 text-sm font-medium">
          {[
            { label: "Home", path: "/" },
            { label: "Search", path: "/search" },
            { label: "About", path: "/about" },
          ].map((item, i) => (
            <NavLink
              key={item.label}
              to={item.path}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="block text-gray-700 focus:outline-none focus:text-orange-600"
              style={{
                transitionDelay:
                  open && !prefersReducedMotion ? `${i * 80}ms` : "0ms",
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
