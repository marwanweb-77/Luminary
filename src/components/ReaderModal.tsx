"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Post, POST_TYPE_CONFIG, Comment } from "@/lib/data";

interface ReaderModalProps {
  post: Post | null;
  onClose: () => void;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export default function ReaderModal({
  post,
  onClose,
  onLike,
  onBookmark,
  isLiked = false,
  isBookmarked = false,
}: ReaderModalProps) {
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [theme, setTheme] = useState<"dark" | "sepia" | "midnight">("dark");
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setIsPlayingSpeech(false);
      window.speechSynthesis?.cancel();
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const config = POST_TYPE_CONFIG[post.type];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const total = target.scrollHeight - target.clientHeight;
    if (total > 0) {
      setScrollProgress((target.scrollTop / total) * 100);
    }
  };

  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      const fullText = `${post.title}. By ${post.author.name}. ${post.content}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingSpeech(false);
      utterance.onerror = () => setIsPlayingSpeech(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingSpeech(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: "c-" + Date.now(),
      author: commentAuthor.trim() || "Thoughtful Reader",
      avatar: (commentAuthor.trim() || "TR").slice(0, 2).toUpperCase(),
      content: commentText.trim(),
      timestamp: "Just now",
      likes: 1,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  const fontClasses = {
    sm: "text-base leading-relaxed",
    md: "text-lg md:text-xl leading-relaxed md:leading-loose",
    lg: "text-xl md:text-2xl leading-loose",
    xl: "text-2xl md:text-3xl leading-loose",
  }[fontSize];

  const themeClasses = {
    dark: "bg-[#0b0c14] text-white/90",
    sepia: "bg-[#14120e] text-[#f4ecd8]",
    midnight: "bg-[#050508] text-white/85",
  }[theme];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl h-[92vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden ${themeClasses}`}
        >
          {/* Reading progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-30">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Reader Top Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-black/30 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.color} ${config.border} border`}
              >
                <span>{config.icon}</span>
                {config.label}
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">
                {post.readTime} min read · {post.publishedAt}
              </span>
            </div>

            {/* Reading controls */}
            <div className="flex items-center gap-2">
              {/* Text-to-speech button */}
              <button
                onClick={toggleSpeech}
                title={isPlayingSpeech ? "Pause Narration" : "Listen to piece"}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isPlayingSpeech
                    ? "bg-violet-600 border-violet-500 text-white animate-pulse"
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
                }`}
              >
                <span>{isPlayingSpeech ? "🔊" : "🎙️"}</span>
                <span className="hidden sm:inline">
                  {isPlayingSpeech ? "Reading..." : "Listen"}
                </span>
              </button>

              {/* Font size toggler */}
              <div className="hidden md:flex items-center rounded-xl border border-white/10 bg-white/5 p-0.5 text-xs text-white/60">
                <button
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-1 rounded-lg ${fontSize === "sm" ? "bg-white/20 text-white font-bold" : ""}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("md")}
                  className={`px-2 py-1 rounded-lg ${fontSize === "md" ? "bg-white/20 text-white font-bold" : ""}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`px-2 py-1 rounded-lg ${fontSize === "lg" ? "bg-white/20 text-white font-bold" : ""}`}
                >
                  A+
                </button>
              </div>

              {/* Theme toggle */}
              <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-white/5 p-1 gap-1">
                <button
                  onClick={() => setTheme("dark")}
                  className={`w-4 h-4 rounded-full bg-[#0b0c14] border ${theme === "dark" ? "border-violet-400 scale-110" : "border-white/20"}`}
                  title="Dark theme"
                />
                <button
                  onClick={() => setTheme("sepia")}
                  className={`w-4 h-4 rounded-full bg-[#1c1813] border ${theme === "sepia" ? "border-amber-400 scale-110" : "border-white/20"}`}
                  title="Warm Sepia theme"
                />
                <button
                  onClick={() => setTheme("midnight")}
                  className={`w-4 h-4 rounded-full bg-[#050508] border ${theme === "midnight" ? "border-indigo-400 scale-110" : "border-white/20"}`}
                  title="Pure Midnight"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors ml-2"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-10 space-y-10 custom-reader-scroll"
          >
            {/* Header info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center justify-between py-4 border-y border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-base font-bold shadow-md">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-base">
                      {post.author.name}
                    </div>
                    <div className="text-white/40 text-xs">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isFollowing
                        ? "bg-white/15 text-white/80 border border-white/10"
                        : "bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-900/30"
                    }`}
                  >
                    {isFollowing ? "Following ✓" : "+ Follow"}
                  </button>
                </div>
              </div>
            </div>

            {/* Excerpt / Callout */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-violet-500 italic text-white/70 text-lg leading-relaxed">
              "{post.excerpt}"
            </div>

            {/* Body Content */}
            <div
              className={`prose prose-invert max-w-none font-serif tracking-normal ${fontClasses} ${
                post.type === "poem" ? "whitespace-pre-line text-center py-4" : ""
              }`}
              style={{
                fontFamily:
                  post.type === "poem"
                    ? "Georgia, Cambria, serif"
                    : "Charter, 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
              }}
            >
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-2xl font-bold font-sans mt-8 mb-4 text-white tracking-tight"
                    >
                      {para.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="mb-6">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Interaction Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all ${
                    isLiked
                      ? "bg-rose-500/20 border-rose-500 text-rose-400 scale-105"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${isLiked ? "fill-rose-400" : "fill-none"}`}
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
                  <span>{post.likes + (isLiked ? 1 : 0)} Appreciations</span>
                </button>

                <button
                  onClick={() => onBookmark(post.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all ${
                    isBookmarked
                      ? "bg-amber-500/20 border-amber-500 text-amber-400 scale-105"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : "fill-none"}`}
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
                  <span>{isBookmarked ? "Saved" : "Save Piece"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 text-sm font-medium flex items-center gap-2 transition-all"
                >
                  <span>{copied ? "✓ Link Copied" : "🔗 Share Link"}</span>
                </button>
              </div>
            </div>

            {/* Author Bio Box */}
            {post.author.bio && (
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {post.author.avatar}
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <div className="text-xs uppercase tracking-wider text-violet-400 font-bold">
                    About the Author
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {post.author.name}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="pt-8 space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Reflections & Thoughts</span>
                <span className="text-sm font-normal text-white/40">
                  ({comments.length})
                </span>
              </h3>

              {/* Add comment input */}
              <form
                onSubmit={handleAddComment}
                className="space-y-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <input
                  type="text"
                  placeholder="Your name or pseudonym..."
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500"
                />
                <textarea
                  placeholder="Share a thoughtful perspective, question, or reflection..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md"
                  >
                    Contribute Thought ✦
                  </button>
                </div>
              </form>

              {/* Existing comments */}
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.015] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-[10px]">
                          {comment.avatar}
                        </div>
                        <span className="font-semibold text-white/80">
                          {comment.author}
                        </span>
                      </div>
                      <span className="text-white/30">{comment.timestamp}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed pl-8">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

