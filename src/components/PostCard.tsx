"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimation";
import { Post, POST_TYPE_CONFIG } from "@/lib/data";

interface PostCardProps {
  post: Post;
  index: number;
  variant?: "default" | "featured" | "compact";
  onOpen?: (post: Post) => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLikeToggle?: (id: string, e: React.MouseEvent) => void;
  onBookmarkToggle?: (id: string, e: React.MouseEvent) => void;
}

export function PostCard({
  post,
  index,
  variant = "default",
  onOpen,
  isLiked = false,
  isBookmarked = false,
  onLikeToggle,
  onBookmarkToggle,
}: PostCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const config = POST_TYPE_CONFIG[post.type];

  const handleCardClick = () => {
    onOpen?.(post);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle?.(post.id, e);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle?.(post.id, e);
  };

  const totalLikes = post.likes + (isLiked ? 1 : 0);

  if (variant === "featured") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleCardClick}
        className="group relative rounded-3xl overflow-hidden cursor-pointer h-[460px] flex flex-col justify-between border border-white/10 hover:border-violet-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-violet-950/40"
        whileHover={{ y: -4 }}
      >
        {/* Dynamic gradient atmosphere */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${post.gradient || "from-violet-600 via-purple-600 to-indigo-700"} opacity-20 group-hover:opacity-35 transition-opacity duration-500`}
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500" />

        {/* Ambient glow effect on hover */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

        {/* Card Content Top */}
        <div className="relative p-8 z-10">
          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide ${config.bg} ${config.color} ${config.border} border`}
            >
              <span>{config.icon}</span>
              {config.label}
            </span>
            <span className="text-white/40 text-xs font-mono">
              {post.readTime} min read · {post.publishedAt}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight group-hover:text-violet-200 transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-white/70 text-base leading-relaxed line-clamp-3 font-serif">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Content Bottom */}
        <div className="relative p-8 z-10 flex items-center justify-between border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {post.author.name}
              </div>
              <div className="text-white/40 text-xs">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isLiked
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-rose-400"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-400" : "fill-none"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{formatNumber(totalLikes)}</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`p-2 rounded-xl transition-all ${
                isBookmarked
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-amber-400"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400" : "fill-none"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            <span className="text-violet-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read <span>→</span>
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.06] backdrop-blur-md p-6 cursor-pointer transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-950/20 flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.color} ${config.border} border`}
          >
            <span>{config.icon}</span>
            {config.label}
          </span>
          <span className="text-white/35 text-xs font-mono">
            {post.readTime}m · {post.publishedAt}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-violet-200 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 font-serif">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-white/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {post.author.avatar}
          </div>
          <div>
            <div className="text-white/90 text-xs font-medium">
              {post.author.name}
            </div>
            <div className="text-white/35 text-[10px]">{post.author.role}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all ${
              isLiked ? "text-rose-400 bg-rose-500/10" : "text-white/45 hover:text-rose-400"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-400" : "fill-none"}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{formatNumber(totalLikes)}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isBookmarked ? "text-amber-400 bg-amber-500/10" : "text-white/45 hover:text-amber-400"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400" : "fill-none"}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}
