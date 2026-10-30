"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimation";

const COMMUNITY_MEMBERS = [
  { initials: "AP", name: "Aisha P.", color: "from-violet-500 to-purple-600", posts: 47, followers: "2.4k" },
  { initials: "EC", name: "Elias C.", color: "from-amber-500 to-orange-600", posts: 23, followers: "1.1k" },
  { initials: "MW", name: "Marcus W.", color: "from-emerald-500 to-teal-600", posts: 89, followers: "5.2k" },
  { initials: "SL", name: "Sophia L.", color: "from-rose-500 to-pink-600", posts: 34, followers: "890" },
  { initials: "DO", name: "David O.", color: "from-blue-500 to-cyan-600", posts: 61, followers: "3.7k" },
  { initials: "NF", name: "Nadia F.", color: "from-indigo-500 to-violet-600", posts: 18, followers: "4.1k" },
];

const TESTIMONIALS = [
  {
    quote:
      "Luminary gave me back the joy of writing. No metrics to chase, no feed to game. Just me and my ideas.",
    author: "Marcus Webb",
    role: "Cognitive Scientist",
    avatar: "MW",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote:
      "I deleted Twitter after finding Luminary. The conversations here are deeper than anything I've experienced online.",
    author: "Aisha Patel",
    role: "Philosopher",
    avatar: "AP",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote:
      "My poem got 4,000 bookmarks. On other platforms, it would've been buried in 10 minutes. Here it lives.",
    author: "Elias Crane",
    role: "Poet",
    avatar: "EC",
    color: "from-amber-500 to-orange-600",
  },
];

export default function CommunitySection() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section ref={ref} id="community" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-violet-400 uppercase block mb-4">
            Community
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Writers who{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              inspire
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            Join a community of thinkers, dreamers, and doers.
          </p>
        </motion.div>

        {/* Member showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {COMMUNITY_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-sm mx-auto mb-3`}
              >
                {member.initials}
              </div>
              <div className="text-white text-xs font-semibold mb-1">{member.name}</div>
              <div className="text-white/30 text-xs">{member.posts} posts</div>
              <div className="text-violet-400 text-xs font-medium mt-1">{member.followers} followers</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
              className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 transition-colors"
            >
              <div className="text-white/30 text-4xl leading-none mb-4">"</div>
              <p className="text-white/70 text-base leading-relaxed italic mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.author}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

