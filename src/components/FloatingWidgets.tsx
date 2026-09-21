"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageSquare } from "lucide-react";

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-full bg-black/60 border border-white/15 text-zinc-300 hover:text-white hover:border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Wall of Thoughts Sticky Launcher */}
      <Link href="/wall-of-thoughts" className="pointer-events-auto group block select-none">
        
        {/* Desktop Card-Stack View */}
        <motion.div
          className="hidden md:flex relative flex-col items-center justify-center w-44 h-28 cursor-pointer"
          animate={{
            y: [0, -6, 0],
            rotate: [-1, 2, -1]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Back Card */}
          <div className="absolute inset-0 bg-[#DFD9CA] border border-[#D2CBB9] rounded-lg rotate-6 translate-x-2.5 translate-y-1.5 shadow-md transition-transform duration-300 group-hover:rotate-8 group-hover:translate-x-3.5" />
          
          {/* Middle Card */}
          <div className="absolute inset-0 bg-[#EBE6D7] border border-[#DCD6C5] rounded-lg -rotate-3 -translate-x-1.5 -translate-y-1 shadow-md transition-transform duration-300 group-hover:-rotate-4 group-hover:-translate-x-2" />
          
          {/* Front Card */}
          <div className="absolute inset-0 bg-[#F5F0E1] border border-[#EBE6D7] rounded-lg shadow-lg flex flex-col justify-between p-4 text-zinc-900 group-hover:shadow-[0_0_20px_rgba(245,240,225,0.3)] transition-all duration-300">
            <div className="flex items-start gap-2 pt-1">
              <MessageSquare size={16} className="text-zinc-500 mt-1 flex-shrink-0" />
              <span className="font-kalam text-lg leading-tight font-bold text-zinc-950">लोग क्या कहेंगे</span>
            </div>
            <span className="font-tag text-xs text-zinc-500 group-hover:text-zinc-800 uppercase tracking-wider text-right">
              Wall of Thoughts →
            </span>
          </div>
        </motion.div>

        {/* Mobile FAB View */}
        <motion.div
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md active:scale-95 cursor-pointer"
          animate={{
            y: [0, -4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={20} />
        </motion.div>

      </Link>
    </div>
  );
}
