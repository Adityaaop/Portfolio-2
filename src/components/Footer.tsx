"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./ui/Icons";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-6 px-6 mt-12 flex justify-center border-t border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center font-body text-xs text-zinc-500">
          <span>&copy; <span className="font-mono-accent text-sm">2026</span> Aditya Ranjan. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span>Built with Next.js & Tailwind.</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/Adityaaop" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
            <GithubIcon size={16} />
          </a>
          <a href="https://www.linkedin.com/in/aditya-ranjan-a52344248" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={16} />
          </a>
          <a href="https://leetcode.com/u/Aditya_1901/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LeetCode">
            <LeetCodeIcon size={16} />
          </a>
        </div>

        {/* Back to Top */}
        <button 
          onClick={handleScrollToTop}
          className="flex items-center gap-2 font-tag text-sm text-zinc-500 hover:text-white transition-colors group tracking-wider"
        >
          Back to top
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
