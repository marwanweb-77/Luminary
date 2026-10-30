"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimation";

export default function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <footer ref={ref} className="relative py-20 px-6 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* CTA band */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-600/20 via-purple-600/15 to-indigo-600/20 border border-violet-500/20 p-12 md:p-16 text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent" />
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to illuminate{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                something?
              </span>
            </h3>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of thinkers who chose depth over noise.
            </p>
            <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-violet-900/50 transition-all duration-300 hover:scale-105">
              Start Writing — It's Free
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 1 L8 15 M1 4 Q8 1 15 4 M1 8 Q8 5 15 8 M1 12 Q8 9 15 12" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-white font-semibold">Luminary</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              A sanctuary for ideas that matter.
            </p>
          </div>

          {[
            {
              heading: "Platform",
              links: ["Explore", "Write", "Community", "Manifesto", "Editors' Picks"],
            },
            {
              heading: "Categories",
              links: ["Articles", "Poetry", "Insights", "Thoughts", "News", "Stories"],
            },
            {
              heading: "Company",
              links: ["About", "Privacy", "Terms", "Open Source", "Press"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 text-sm hover:text-white/70 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/20 text-sm">
            © 2026 Luminary. Built with ✦ for minds that seek depth.
          </p>
          <p className="text-white/15 text-xs">No ads. No tracking. No brainrot.</p>
        </div>
      </motion.div>
    </footer>
  );
}

