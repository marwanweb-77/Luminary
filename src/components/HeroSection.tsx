"use client";

import { useEffect, useRef, useState } from "react";
import { useTypingEffect } from "@/hooks/useAnimation";
import { motion } from "framer-motion";

const HERO_PHRASES = [
  "thoughts that matter",
  "poems that breathe",
  "insights that last",
  "stories worth telling",
  "ideas without noise",
];

const FLOATING_WORDS = [
  { text: "Philosophy", x: "8%", y: "20%", delay: 0.5 },
  { text: "Poetry", x: "85%", y: "15%", delay: 0.8 },
  { text: "Science", x: "12%", y: "78%", delay: 1.1 },
  { text: "Culture", x: "80%", y: "75%", delay: 0.3 },
  { text: "Art", x: "50%", y: "88%", delay: 0.9 },
  { text: "Truth", x: "90%", y: "45%", delay: 1.4 },
  { text: "Wonder", x: "6%", y: "50%", delay: 0.6 },
];

interface HeroSectionProps {
  onExplore?: () => void;
  onWrite?: () => void;
}

export default function HeroSection({ onExplore, onWrite }: HeroSectionProps) {
  const typedText = useTypingEffect(HERO_PHRASES, 70, 35, 2500);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-4"
      style={{
        background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${
          mousePos.y * 100
        }%, rgba(139,92,246,0.18) 0%, rgba(79,70,229,0.07) 35%, transparent 70%)`,
        transition: "background 0.2s ease-out",
      }}
    >
      {/* Floating ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-25"
            style={{
              width: `${[380, 450, 320, 400, 350][i]}px`,
              height: `${[380, 450, 320, 400, 350][i]}px`,
              background: [
                "radial-gradient(circle, rgba(139,92,246,0.9), transparent)",
                "radial-gradient(circle, rgba(236,72,153,0.8), transparent)",
                "radial-gradient(circle, rgba(59,130,246,0.9), transparent)",
                "radial-gradient(circle, rgba(16,185,129,0.8), transparent)",
                "radial-gradient(circle, rgba(245,158,11,0.8), transparent)",
              ][i],
              left: `${[10, 65, 20, 75, 45][i]}%`,
              top: `${[15, 10, 65, 55, 35][i]}%`,
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              y: [0, (i % 2 === 0 ? -30 : 30), 0],
              scale: [1, 1.08, 0.94, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Floating words */}
      {FLOATING_WORDS.map((word, i) => (
        <motion.div
          key={i}
          className="absolute text-xs sm:text-sm font-semibold tracking-widest text-white/20 uppercase select-none pointer-events-none hidden md:block"
          style={{ left: word.x, top: word.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isLoaded ? [0.15, 0.35, 0.15] : 0,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, delay: word.delay + 0.5 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: word.delay },
          }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Main Hero Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        {/* Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
            </span>
            <span className="text-xs font-semibold tracking-[0.25em] text-violet-300 uppercase">
              The Anti-Brainrot Platform
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #d8b4fe 40%, #818cf8 100%)",
            }}
          >
            Where Thought Lives.
          </span>
        </motion.h1>

        {/* Dynamic Typewriter text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-2"
        >
          <p className="text-lg sm:text-2xl text-white/60 font-light tracking-wide">
            A sanctuary designed solely for
          </p>
          <div className="text-2xl sm:text-4xl md:text-5xl font-bold h-14 flex items-center justify-center">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="ml-1.5 w-1 h-8 sm:h-10 bg-violet-400 animate-pulse inline-block rounded-full" />
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <button
            onClick={() => (onExplore ? onExplore() : handleScrollTo("explore"))}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-violet-900/40 hover:shadow-2xl hover:shadow-violet-900/60 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Ideas</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          <button
            onClick={() => (onWrite ? onWrite() : handleScrollTo("write"))}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md text-white font-semibold text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>✍️ Start Writing</span>
          </button>

          <button
            onClick={() => handleScrollTo("manifesto")}
            className="text-white/50 hover:text-white text-sm font-medium transition-colors sm:ml-2"
          >
            Read Manifesto →
          </button>
        </motion.div>

        {/* Stat metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-10 grid grid-cols-3 gap-6 sm:gap-12 border-t border-white/10 max-w-2xl mx-auto"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">0%</div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">
              Algorithmic Noise
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">
              Human Created
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">7 min</div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">
              Avg Contemplation
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.button
        onClick={() => handleScrollTo("explore")}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/80 transition-colors p-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>
    </div>
  );
}
