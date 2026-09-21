"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Loader2, Pin } from "lucide-react";
import GlassCard from "./GlassCard";
import { useToast } from "./ui/Toast";

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Thought {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  pinned?: boolean;
}

// Seeded rotation generator to keep sticky notes rotated consistently
const getSeededRotation = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Map to between -3.5 and +3.5 degrees
  const val = (hash % 8) * 0.9;
  return val === 0 ? 1.5 : val;
};

// Client-side lightweight relative time formatter
const formatRelativeTime = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export default function WallOfThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, "like" | "dislike">>({});
  const { showToast } = useToast();

  useEffect(() => {
    async function loadThoughts() {
      try {
        const res = await fetch("/api/thoughts", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item: any) => ({
            id: item.id,
            author: item.name,
            avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${item.name}`,
            content: item.message,
            timestamp: formatRelativeTime(item.created_at),
            likes: item.likes || 0,
            dislikes: item.dislikes || 0,
            replies: Array.isArray(item.replies)
              ? item.replies
                  .filter((r: any) => r.approved !== false)
                  .map((r: any) => ({
                    ...r,
                    timestamp: formatRelativeTime(r.timestamp)
                  }))
              : [],
            pinned: item.pinned
          }));
          setThoughts(mapped);
        }
      } catch (error) {
        console.error("Failed to load thoughts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadThoughts();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aditya_portfolio_votes");
      if (saved) {
        setUserVotes(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load user votes:", e);
    }
  }, []);

  const handleSubmitThought = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to post thought.");
      }

      // Prepend the new thought to the UI list immediately
      const newThought: Thought = {
        id: json.data?.id || Date.now().toString(),
        author: name.trim(),
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${name}`,
        content: message.trim(),
        timestamp: "Just now",
        likes: 0,
        dislikes: 0,
        replies: [],
        pinned: false
      };

      setThoughts((prev) => [newThought, ...prev]);
      setName("");
      setMessage("");
      showToast("Thought pinned successfully!", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to post thought. Try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string, isLike: boolean) => {
    if (userVotes[id]) {
      showToast("You have already voted on this thought!", "info");
      return;
    }

    try {
      const res = await fetch(`/api/thoughts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: isLike ? "like" : "dislike" })
      });
      if (res.ok) {
        const newVotes = { ...userVotes, [id]: isLike ? ("like" as const) : ("dislike" as const) };
        setUserVotes(newVotes);
        localStorage.setItem("aditya_portfolio_votes", JSON.stringify(newVotes));

        setThoughts((prev) => 
          prev.map(thought => {
            if (thought.id === id) {
              return {
                ...thought,
                likes: isLike ? thought.likes + 1 : thought.likes,
                dislikes: !isLike ? thought.dislikes + 1 : thought.dislikes
              };
            }
            return thought;
          })
        );
        showToast(isLike ? "Liked!" : "Disliked!", "success");
      }
    } catch (error) {
      console.error("Failed to update like/dislike:", error);
    }
  };

  const handleReplySubmit = async (id: string) => {
    if (!replyName.trim() || !replyMessage.trim()) return;
    
    try {
      const replyData = {
        author: replyName.trim(),
        content: replyMessage.trim()
      };
      
      const res = await fetch(`/api/thoughts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reply", reply: replyData })
      });
      
      const json = await res.json();
      
      if (res.ok && json.success) {
        const newReply = {
          id: json.data.id,
          author: json.data.author,
          avatar: json.data.avatar,
          content: json.data.content,
          timestamp: formatRelativeTime(json.data.timestamp),
          approved: json.data.approved
        };
        
        setThoughts((prev) => 
          prev.map(thought => {
            if (thought.id === id) {
              return {
                ...thought,
                replies: [...thought.replies, newReply]
              };
            }
            return thought;
          })
        );
        showToast("Reply submitted for approval!", "success");
      } else {
        showToast(json.message || "Failed to add reply.", "error");
      }
    } catch (error) {
      console.error("Failed to add reply:", error);
      showToast("Error adding reply.", "error");
    } finally {
      setReplyName("");
      setReplyMessage("");
      setActiveReplyId(null);
    }
  };

  return (
    <section id="wall-of-thoughts" className="relative w-full py-24 px-6 flex flex-col items-center overflow-visible">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12 z-10 overflow-visible">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase"
          >
            WALL OF THOUGHTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            What do you think about me, my projects, or my journey? Drop a message!
          </motion.p>
        </div>

        {/* Submission Form (📌 Pin your thought Glass Card) */}
        <GlassCard className="w-full max-w-2xl flex flex-col gap-6" hoverEffect={false} delay={0.2}>
          <h3 className="font-tag text-lg sm:text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
            📌 Pin your thought
          </h3>
          <form onSubmit={handleSubmitThought} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                suppressHydrationWarning={true}
                className="w-full sm:w-1/3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-tag focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
              />
            </div>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              suppressHydrationWarning={true}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600 resize-none text-sm sm:text-base"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-tag text-base font-bold text-zinc-300 bg-white/5 border border-white/12 hover:border-white hover:text-white disabled:opacity-50 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                {isSubmitting ? "Pinning..." : "Pin Thought"}
              </button>
            </div>
          </form>
        </GlassCard>

        {/* CSS Masonry Grid Wall */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 size={36} className="animate-spin text-white/50" />
          </div>
        ) : thoughts.length === 0 ? (
          <div className="text-zinc-500 font-body text-base py-12 text-center">
            The wall is empty. Be the first to share a thought!
          </div>
        ) : (
          <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance] overflow-visible pb-12">
            <AnimatePresence initial={false}>
              {thoughts.map((thought, idx) => {
                const rotation = getSeededRotation(thought.id);
                return (
                  <div key={thought.id} className="break-inside-avoid pb-2 overflow-visible">
                    {/* Sticky Note */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -40, rotate: rotation - 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
                      exit={{ opacity: 0, scale: 0.8, y: 40 }}
                      whileHover={{ 
                        y: -6, 
                        rotate: rotation * 0.15, 
                        scale: 1.03,
                        boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.35), 0 15px 15px -5px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ transformOrigin: "center top" }}
                      className={`relative w-full ${
                        thought.pinned 
                          ? "bg-[#FCF9F2] shadow-lg border-[#D3C5A3]" 
                          : "bg-[#F5F0E1] shadow-md border-[#EBE6D7]"
                      } text-zinc-900 rounded-lg p-6 flex flex-col gap-3 group/note overflow-visible z-10 hover:z-20`}
                    >
                      {/* Pinned star/pin icon */}
                      {thought.pinned && (
                        <div 
                          className="absolute top-2 right-2 text-red-600 bg-red-500/10 rounded-full p-1 border border-red-500/20 shadow-sm z-10"
                          title="Pinned Thought"
                        >
                          <Pin size={12} className="rotate-45 fill-red-600" />
                        </div>
                      )}

                      {/* Washi Tape Strip */}
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 ${
                        thought.pinned 
                          ? "bg-[#c4b595]/80 border-red-600/10" 
                          : "bg-[#d9d0be]/65"
                      } backdrop-blur-[1px] border-y border-black/[0.04] shadow-xs rotate-[-1.5deg] pointer-events-none select-none`} />

                      {/* Author & Timestamp */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={thought.avatar} 
                          alt={thought.author} 
                          className="w-10 h-10 rounded-full border border-black/10 bg-zinc-200" 
                        />
                        <div className="flex flex-col">
                          <span className="font-doto text-sm font-bold text-zinc-950 tracking-wide leading-tight">
                            {thought.author}
                          </span>
                          <span className="font-body text-xs text-zinc-600 font-medium">
                            {thought.timestamp}
                          </span>
                        </div>
                      </div>
                      
                      {/* Message Body */}
                      <p className="font-handwritten text-2xl text-zinc-800 leading-tight">
                        {thought.content}
                      </p>

                      {/* Likes / Dislikes / Reply Buttons */}
                      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-zinc-900/10 text-zinc-600">
                        <button 
                          onClick={() => handleLike(thought.id, true)} 
                          disabled={!!userVotes[thought.id]}
                          className={`flex items-center gap-1 transition-colors ${
                            userVotes[thought.id] === "like"
                              ? "text-green-700 font-bold"
                              : !!userVotes[thought.id]
                              ? "text-zinc-400 opacity-60 cursor-not-allowed"
                              : "hover:text-zinc-950 text-zinc-600"
                          }`}
                          title={userVotes[thought.id] ? "You have already voted" : "Like"}
                        >
                          <ThumbsUp size={14} className={userVotes[thought.id] === "like" ? "fill-green-700" : ""} /> 
                          <span className="font-mono-accent text-xs">{thought.likes}</span>
                        </button>
                        <button 
                          onClick={() => handleLike(thought.id, false)} 
                          disabled={!!userVotes[thought.id]}
                          className={`flex items-center gap-1 transition-colors ${
                            userVotes[thought.id] === "dislike"
                              ? "text-red-700 font-bold"
                              : !!userVotes[thought.id]
                              ? "text-zinc-400 opacity-60 cursor-not-allowed"
                              : "hover:text-zinc-950 text-zinc-600"
                          }`}
                          title={userVotes[thought.id] ? "You have already voted" : "Dislike"}
                        >
                          <ThumbsDown size={14} className={userVotes[thought.id] === "dislike" ? "fill-red-700" : ""} /> 
                          <span className="font-mono-accent text-xs">
                            {thought.dislikes > 0 ? thought.dislikes : ""}
                          </span>
                        </button>
                        <button 
                          onClick={() => setActiveReplyId(activeReplyId === thought.id ? null : thought.id)} 
                          className="flex items-center gap-1 font-tag text-sm hover:text-zinc-950 transition-colors ml-auto"
                        >
                          Reply (<span className="font-mono-accent text-xs">{thought.replies.length}</span>)
                        </button>
                      </div>

                      {/* Reply Input Box */}
                      {activeReplyId === thought.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 flex flex-col gap-2 border-t border-zinc-900/10 pt-3"
                        >
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={replyName}
                            onChange={(e) => setReplyName(e.target.value)}
                            required
                            suppressHydrationWarning={true}
                            className="w-full bg-white/50 border border-black/10 rounded-lg px-3 py-2 text-sm sm:text-base text-zinc-900 font-doto font-semibold placeholder:text-zinc-500 focus:outline-none focus:bg-white"
                          />
                          <textarea
                            placeholder="Write your reply..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            required
                            rows={2}
                            suppressHydrationWarning={true}
                            className="w-full bg-white/50 border border-black/10 rounded-lg px-3 py-2 text-sm sm:text-base text-zinc-900 font-handwritten font-bold placeholder:text-zinc-500 focus:outline-none focus:bg-white resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveReplyId(null);
                                setReplyName("");
                                setReplyMessage("");
                              }}
                              className="px-2.5 py-1 bg-zinc-400/20 hover:bg-zinc-400/40 text-zinc-800 rounded-lg text-[10px] font-tag tracking-wider transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleReplySubmit(thought.id)} 
                              disabled={!replyName.trim() || !replyMessage.trim()}
                              className="px-3.5 py-1 bg-zinc-900 hover:bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-[10px] font-tag tracking-wider transition-all cursor-pointer"
                            >
                              Send
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Nested Replies stacked below */}
                    {thought.replies.length > 0 && (
                      <div className="flex flex-col gap-3 mt-3 pl-6 pr-2 overflow-visible">
                        {thought.replies.map((reply, rIdx) => {
                          const replyRotation = -rotation * 0.7 * (rIdx % 2 === 0 ? 1 : -1);
                          return (
                            <motion.div
                              key={reply.id}
                              initial={{ opacity: 0, y: 10, rotate: replyRotation }}
                              animate={{ opacity: 1, y: 0, rotate: replyRotation }}
                              whileHover={{ 
                                y: -3, 
                                rotate: 0,
                                scale: 1.02,
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.15)"
                              }}
                              className="relative w-[95%] ml-auto bg-[#EBE6D7] text-zinc-800 rounded p-4 shadow-sm border border-[#DCD6C5] flex flex-col gap-2 overflow-visible z-0 hover:z-20"
                            >
                              {/* Tiny Washi Tape for Reply */}
                              <div className="absolute -top-2 left-1/4 w-12 h-3.5 bg-[#b8ad98]/50 backdrop-blur-xs rotate-[2deg] pointer-events-none" />
                              
                              <div className="flex items-center gap-2">
                                <img 
                                  src={reply.avatar} 
                                  alt={reply.author} 
                                  className="w-7 h-7 rounded-full border border-black/10 bg-zinc-200" 
                                />
                                <div className="flex flex-col">
                                  <span className="font-doto text-xs font-bold text-zinc-900 leading-none">
                                    {reply.author}
                                  </span>
                                  <span className="font-body text-[8px] text-zinc-500">
                                    {reply.timestamp}
                                  </span>
                                </div>
                              </div>
                              <p className="font-handwritten text-lg text-zinc-700 leading-snug">
                                {reply.content}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
