"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleCanvas from "@/components/ParticleCanvas";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ExploreSection from "@/components/ExploreSection";
import WriteSection from "@/components/WriteSection";
import ManifestoSection from "@/components/ManifestoSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import ReaderModal from "@/components/ReaderModal";
import { Post, SAMPLE_POSTS } from "@/lib/data";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem("luminary_custom_posts");
      if (storedPosts) {
        const parsed = JSON.parse(storedPosts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts([...parsed, ...SAMPLE_POSTS]);
        }
      }

      const storedLikes = localStorage.getItem("luminary_likes");
      if (storedLikes) {
        setLikedIds(new Set(JSON.parse(storedLikes)));
      }

      const storedBookmarks = localStorage.getItem("luminary_bookmarks");
      if (storedBookmarks) {
        setBookmarkedIds(new Set(JSON.parse(storedBookmarks)));
      }
    } catch {
      // Local storage fallback
    }

    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Sync likes
  const handleLikeToggle = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem("luminary_likes", JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Sync bookmarks
  const handleBookmarkToggle = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(
          "luminary_bookmarks",
          JSON.stringify(Array.from(next))
        );
      } catch {}
      return next;
    });
  };

  // Publish a new piece
  const handlePublishPost = (newPost: Post) => {
    setPosts((prev) => {
      const updated = [newPost, ...prev];
      try {
        const userCreated = updated.filter((p) => p.id.startsWith("user-"));
        localStorage.setItem(
          "luminary_custom_posts",
          JSON.stringify(userCreated)
        );
      } catch {}
      return updated;
    });
  };

  const handleOpenSaved = () => {
    const el = document.getElementById("explore");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-white selection:bg-violet-600/30 selection:text-white noise">
      {/* 4K Particle Canvas Background */}
      <ParticleCanvas />

      {/* Opening Intro Flash / Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-violet-600 blur-2xl opacity-40 scale-150 rounded-full" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-2xl">
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M20 5 L20 35 M5 12 Q20 5 35 12 M5 20 Q20 13 35 20 M5 28 Q20 21 35 28"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              className="text-2xl font-bold tracking-tight text-white mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Luminary
            </motion.h1>

            <motion.div
              className="w-36 h-0.5 bg-white/10 rounded-full overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Structure */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          bookmarksCount={bookmarkedIds.size}
          onOpenSaved={handleOpenSaved}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onExplore={() => {
              document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
            }}
            onWrite={() => {
              document.getElementById("write")?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Explore / Reading Feed Section */}
          <ExploreSection
            posts={posts}
            onOpenPost={(post) => setSelectedPost(post)}
            likedIds={likedIds}
            bookmarkedIds={bookmarkedIds}
            onLikeToggle={handleLikeToggle}
            onBookmarkToggle={handleBookmarkToggle}
          />

          {/* Functional Studio / Write Section */}
          <WriteSection onPublish={handlePublishPost} />

          {/* Manifesto Section */}
          <ManifestoSection />

          {/* Community & Writers Section */}
          <CommunitySection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Reader Modal (Active when clicking any piece) */}
      {selectedPost && (
        <ReaderModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLikeToggle}
          onBookmark={handleBookmarkToggle}
          isLiked={likedIds.has(selectedPost.id)}
          isBookmarked={bookmarkedIds.has(selectedPost.id)}
        />
      )}
    </div>
  );
}
