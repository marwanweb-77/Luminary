"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "@/hooks/useAnimation";
import { Post } from "@/lib/data";

const POST_TYPES = [
  { key: "article", label: "Article", icon: "📝", description: "Deep-dive essays and long-form writing" },
  { key: "poem", label: "Poem", icon: "✨", description: "Verse, rhythm, language as art" },
  { key: "insight", label: "Insight", icon: "💡", description: "A sharp observation or realization" },
  { key: "thought", label: "Thought", icon: "💭", description: "Something that's been on your mind" },
  { key: "news", label: "News", icon: "📰", description: "Commentary on what's happening" },
  { key: "story", label: "Story", icon: "📖", description: "Fiction or creative non-fiction" },
] as const;

interface WriteSectionProps {
  onPublish: (post: Post) => void;
}

export default function WriteSection({ onPublish }: WriteSectionProps) {
  const [selectedType, setSelectedType] = useState<Post["type"]>("article");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tagInput, setTagInput] = useState("Philosophy, Ideas");
  const [isPreview, setIsPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.08 });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = body
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const charCount = body.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 180));

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${Math.max(220, textAreaRef.current.scrollHeight)}px`;
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !body.trim()) {
      alert("Please enter both a title and some thoughts to publish.");
      return;
    }

    setIsPublishing(true);

    const gradients = [
      "from-violet-600 via-purple-600 to-indigo-600",
      "from-rose-500 via-pink-500 to-purple-600",
      "from-emerald-500 via-teal-500 to-cyan-600",
      "from-amber-500 via-orange-500 to-rose-500",
      "from-blue-500 via-indigo-500 to-violet-600",
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const cleanAuthor = authorName.trim() || "You";
    const initials = cleanAuthor
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "YOU";

    const tagsArray = tagInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter((t) => t.length > 0);

    const newPost: Post = {
      id: "user-" + Date.now(),
      type: selectedType,
      title: title.trim(),
      excerpt:
        body.length > 180 ? body.slice(0, 180) + "..." : body.trim(),
      content: body.trim(),
      author: {
        name: cleanAuthor,
        avatar: initials,
        role: "Contributing Writer",
        bio: `Writer and thinker contributing to the Luminary creative sanctuary.`,
      },
      tags: tagsArray.length > 0 ? tagsArray : ["Ideas"],
      readTime: readTime,
      publishedAt: "Just now",
      likes: 1,
      bookmarks: 0,
      featured: true,
      gradient: randomGradient,
    };

    setTimeout(() => {
      onPublish(newPost);
      setIsPublishing(false);
      setPublishedToast(true);

      // Reset fields
      setTitle("");
      setBody("");
      setIsPreview(false);

      // Smooth scroll to explore
      const exploreEl = document.getElementById("explore");
      if (exploreEl) {
        exploreEl.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => setPublishedToast(false), 4000);
    }, 600);
  };

  return (
    <section ref={ref} id="write" className="relative py-28 px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <span>✍️</span> Studio Workspace
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Your voice,{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              unfiltered
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            No character limits. No viral optimization gimmicks. Write with
            intention and publish immediately to the community.
          </p>
        </motion.div>

        {/* Type Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {POST_TYPES.map((type) => (
              <button
                key={type.key}
                type="button"
                onClick={() => setSelectedType(type.key)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-medium transition-all ${
                  selectedType === type.key
                    ? "border-violet-500 bg-violet-600/20 text-white shadow-lg shadow-violet-900/30 scale-105"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-xl">{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Editor Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Editor Header Toolbar */}
          <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/20">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Author Name (e.g. Your Name)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-violet-500"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-violet-500 hidden sm:inline-block"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  isPreview
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {isPreview ? "Edit Mode" : "Preview"}
              </button>

              <div className="text-xs text-white/40 font-mono hidden md:flex items-center gap-2">
                <span>{wordCount} words</span>
                <span>·</span>
                <span>~{readTime}m read</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {!isPreview ? (
            <div className="p-6 sm:p-8 space-y-4">
              <input
                type="text"
                placeholder="Title of your piece..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-white text-2xl sm:text-4xl font-extrabold placeholder-white/20 outline-none border-none leading-tight"
              />

              <textarea
                ref={textAreaRef}
                placeholder={
                  selectedType === "poem"
                    ? "Write your verse here...\nBetween silence and memory..."
                    : "Begin writing your thoughts, essay, or insights here..."
                }
                value={body}
                onChange={handleBodyChange}
                className="w-full bg-transparent text-white/80 text-base sm:text-lg placeholder-white/20 outline-none border-none resize-none leading-relaxed min-h-[220px]"
                style={{
                  fontFamily:
                    selectedType === "poem"
                      ? "Georgia, Cambria, serif"
                      : "Charter, Georgia, serif",
                }}
              />
            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6 min-h-[300px]">
              <div className="text-xs uppercase tracking-widest text-violet-400 font-bold">
                Preview Mode
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {title || "Untitled Piece"}
              </h1>
              <div className="text-sm text-white/40">
                By {authorName || "You"} · ~{readTime} min read
              </div>
              <div
                className={`text-white/80 text-lg leading-relaxed whitespace-pre-line ${
                  selectedType === "poem" ? "text-center font-serif py-4" : "font-serif"
                }`}
              >
                {body || "Your written content will appear here."}
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
            <div className="text-xs text-white/40 font-mono">
              {charCount} characters
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || !title.trim() || !body.trim()}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-violet-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 flex items-center gap-2 cursor-pointer"
              >
                <span>{isPublishing ? "Publishing..." : "Publish to Community ✦"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Toast confirmation */}
        {publishedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-2xl flex items-center gap-3 border border-violet-400/30"
          >
            <span>🎉</span>
            <span>Your piece is live! It has been added to the feed.</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
