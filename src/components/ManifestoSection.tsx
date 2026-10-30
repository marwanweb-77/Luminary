"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimation";

const MANIFESTO_POINTS = [
  {
    number: "01",
    title: "Depth over clicks",
    body: "We refuse to optimize for your attention span. We optimize for your growth. A 10-minute read that changes how you see the world is worth more than a thousand dopamine hits.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    title: "No algorithmic feeds",
    body: "What you see here is curated by humans who care, not machines that profit. Editors choose what rises — not engagement metrics, not ad revenue.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    number: "03",
    title: "Anonymous reading",
    body: "Your attention is not data. We don't track what you read, how long you spent on it, or what you felt. You are a reader, not a product.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    number: "04",
    title: "Permanence matters",
    body: "Great writing deserves to last. Everything on Luminary is archived, searchable, and preserved. No content disappears into the void.",
    gradient: "from-rose-500 to-pink-600",
  },
];

const STATS = [
  { value: "Zero", label: "Ads. Ever." },
  { value: "100%", label: "Ad-free reading" },
  { value: "7 min", label: "Average read time" },
  { value: "No", label: "Algorithmic feed" },
];

export default function ManifestoSection() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section ref={ref} id="manifesto" className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-violet-400 uppercase block mb-4">
            Our Manifesto
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We believe the internet{" "}
            <br className="hidden md:block" />
            can be{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              better
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Luminary was built as an antidote to attention-economy platforms. We
            believe thoughtful content deserves a thoughtful home.
          </p>
        </motion.div>

        {/* Manifesto points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {MANIFESTO_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
              />
              <div
                className={`text-6xl font-black bg-gradient-to-br ${point.gradient} bg-clip-text text-transparent mb-6 leading-none`}
              >
                {point.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
              <p className="text-white/50 leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

