"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useScrollProgress } from "@/hooks/useAnimation";
import AmbientAudioPlayer from "./AmbientAudioPlayer";

interface NavbarProps {
  bookmarksCount?: number;
  onOpenSaved?: () => void;
}

const NAV_LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "Write", href: "#write" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Community", href: "#community" },
];

export default function Navbar({ bookmarksCount = 0, onOpenSaved }: NavbarProps) {
  const scrollProgress = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollProgress > 0.02;

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#050508]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Dynamic reading scroll progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 20 20"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M10 2 L10 18 M2 6 Q10 2 18 6 M2 10 Q10 6 18 10 M2 14 Q10 10 18 14"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg tracking-tight group-hover:text-violet-300 transition-colors">
                Luminary
              </span>
              <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono">
                Sanctuary for Ideas
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-violet-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center gap-3">
            {/* Ambient sound generator */}
            <AmbientAudioPlayer />

            {/* Saved Pieces shortcut */}
            {bookmarksCount > 0 && (
              <button
                onClick={onOpenSaved}
                className="px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <span>★</span>
                <span>Saved ({bookmarksCount})</span>
              </button>
            )}

            {/* Start Writing button */}
            <button
              onClick={() => scrollToSection("#write")}
              className="relative overflow-hidden px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-violet-900/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Writing ✦
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <AmbientAudioPlayer />
            <button
              className="text-white/80 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="w-5 flex flex-col gap-1">
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    mobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 bg-[#07080e]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden space-y-4"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/80 hover:text-white text-base font-semibold text-left py-2 border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollToSection("#write")}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm text-center"
            >
              Start Writing ✦
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
