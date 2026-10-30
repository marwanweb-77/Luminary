"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Post } from "@/lib/data";
import { PostCard } from "./PostCard";
import { useInView } from "@/hooks/useAnimation";

const FILTERS = [
  { key: "all", label: "All Pieces", icon: "✦" },
  { key: "article", label: "Articles", icon: "📝" },
  { key: "poem", label: "Poetry", icon: "✨" },
  { key: "insight", label: "Insights", icon: "💡" },
  { key: "thought", label: "Thoughts", icon: "💭" },
  { key: "news", label: "News & Analysis", icon: "📰" },
  { key: "story", label: "Stories", icon: "📖" },
];

interface ExploreSectionProps {
  posts: Post[];
  onOpenPost: (post: Post) => void;
  likedIds: Set<string>;
  bookmarkedIds: Set<string>;
  onLikeToggle: (id: string) => void;
  onBookmarkToggle: (id: string) => void;
}

export default function ExploreSection({
  posts,
  onOpenPost,
  likedIds,
  bookmarkedIds,
  onLikeToggle,
  onBookmarkToggle,
}: ExploreSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"curated" | "latest" | "likes">("curated");
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.05 });

  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (showOnlySaved) {
      list = list.filter((p) => bookmarkedIds.has(p.id));
    }

    if (activeFilter !== "all") {
      list = list.filter((p) => p.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === "likes") {
      list.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "latest") {
      // Keep newer first
      list.reverse();
    }

    return list;
  }, [posts, activeFilter, searchQuery, sortBy, showOnlySaved, bookmarkedIds]);

  const featured = filteredPosts.filter((p) => p.featured);
  const regular = filteredPosts.filter((p) => !p.featured);

  return (
    <section ref={ref} id="explore" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span>✦</span> Curated Feed
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ideas that{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                resonate
              </span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-base leading-relaxed">
            No endless feeds designed for doom-scrolling. Every essay, poem, and
            realization here was curated to provoke quiet reflection.
          </p>
        </div>
      </motion.div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Real-time Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by topic, keyword, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort & Bookmarks filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              className={`px-4 py-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                showOnlySaved
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md"
                  : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white"
              }`}
            >
              <span>{showOnlySaved ? "★" : "☆"}</span>
              <span>Saved ({bookmarkedIds.size})</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "curated" | "latest" | "likes")}
              className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white/70 text-xs font-semibold outline-none cursor-pointer hover:border-white/20"
            >
              <option value="curated" className="bg-[#0b0c14] text-white">
                Sort: Curated
              </option>
              <option value="likes" className="bg-[#0b0c14] text-white">
                Sort: Most Appreciated
              </option>
              <option value="latest" className="bg-[#0b0c14] text-white">
                Sort: Latest
              </option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                activeFilter === filter.key
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40 border border-violet-400/30"
                  : "bg-white/[0.025] border border-white/5 text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
              {activeFilter === filter.key && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-xl bg-violet-600 -z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Posts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + sortBy + searchQuery + (showOnlySaved ? "saved" : "all")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-white/5 bg-white/[0.01]">
              <div className="text-5xl mb-4">🌌</div>
              <h3 className="text-xl font-bold text-white mb-2">No pieces found</h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto">
                {showOnlySaved
                  ? "You haven't saved any pieces yet. Click the bookmark icon on any card to save it."
                  : "Try tweaking your search keywords or choosing another category."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* If on 'All' or no active search, show featured first */}
              {featured.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featured.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      variant="featured"
                      onOpen={onOpenPost}
                      isLiked={likedIds.has(post.id)}
                      isBookmarked={bookmarkedIds.has(post.id)}
                      onLikeToggle={() => onLikeToggle(post.id)}
                      onBookmarkToggle={() => onBookmarkToggle(post.id)}
                    />
                  ))}
                </div>
              )}

              {/* Regular Posts Grid */}
              {regular.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {regular.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      onOpen={onOpenPost}
                      isLiked={likedIds.has(post.id)}
                      isBookmarked={bookmarkedIds.has(post.id)}
                      onLikeToggle={() => onLikeToggle(post.id)}
                      onBookmarkToggle={() => onBookmarkToggle(post.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
