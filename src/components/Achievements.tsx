"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Users, ExternalLink } from "lucide-react";
import GlassCard from "./GlassCard";
import { GithubIcon, LeetCodeIcon } from "./ui/Icons";

const achievements = [
  {
    title: "3rd Position",
    event: "Dark Buster Hackathon — IIT BHU",
    subtitle: "Competitive National Hackathon Honor",
    icon: Trophy,
    badge: "Hackathon Winner"
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    event: "Amazon AWS Training — May 2025",
    subtitle: "Cloud Architecture & Fundamentals",
    icon: Medal,
    badge: "AWS Training"
  },
  {
    title: "Full Stack Web Development",
    event: "Udemy Certified — August 2026",
    subtitle: "End-to-End Modern Web Engineering",
    icon: Award,
    badge: "Certified"
  },
  {
    title: "Active Community Member",
    event: "Gameforge Community — IILM University",
    subtitle: "Feb 2025 – Present",
    icon: Users,
    badge: "Leadership"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase"
          >
            ACHIEVEMENTS & CERTIFICATIONS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Recognitions, professional certifications, and hackathon accomplishments.
          </motion.p>
        </div>

        {/* Trophy & Certifications Shelf */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <div key={idx} className="block group">
                <GlassCard 
                  delay={idx * 0.1} 
                  className="flex items-center gap-4 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 !p-6"
                >
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 group-hover:bg-white/10 group-hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0">
                    <Icon size={28} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tag font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-zinc-300">
                        {achievement.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wide group-hover:text-white transition-colors truncate">
                      {achievement.title}
                    </h3>
                    <span className="font-body text-xs sm:text-sm text-zinc-300 font-semibold truncate">
                      {achievement.event}
                    </span>
                    <span className="font-body text-xs text-zinc-500 truncate">
                      {achievement.subtitle}
                    </span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Developer Profiles: GitHub & LeetCode */}
        <div className="w-full max-w-2xl mt-4 flex flex-col gap-6">
          {/* GitHub Profile & Projects Card */}
          <GlassCard 
            delay={0.4} 
            className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left border-zinc-200/15 shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:border-zinc-200/30 transition-all duration-300"
          >
            {/* Clickable External Icon Link */}
            <a 
              href="https://github.com/Adityaaop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              aria-label="Visit GitHub Profile"
            >
              <ExternalLink size={20} />
            </a>

            {/* GitHub Logo */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner shrink-0 text-white">
              <GithubIcon size={38} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-tag text-lg font-bold text-white tracking-wider uppercase">GitHub Profile & Projects</h3>
              <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Active developer exploring modern front-end technologies, responsive UI systems, and full-stack integration.
              </p>
              
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="inline-flex items-center justify-center sm:justify-start">
                  <a
                    href="https://github.com/Adityaaop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 font-mono-accent text-sm font-bold text-white bg-white/5 border border-white/10 hover:border-white rounded shadow-sm transition-colors"
                  >
                    github.com/Adityaaop →
                  </a>
                </div>

                {/* Focus Tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    React.js
                  </span>
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    JavaScript
                  </span>
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    AWS Cloud
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* LeetCode Profile Card */}
          <GlassCard 
            delay={0.5} 
            className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left border-zinc-200/15 shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:border-zinc-200/30 transition-all duration-300"
          >
            {/* Clickable External Icon Link */}
            <a 
              href="https://leetcode.com/u/Aditya_1901/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              aria-label="Visit LeetCode Profile"
            >
              <ExternalLink size={20} />
            </a>

            {/* LeetCode Logo */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <LeetCodeIcon size={38} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-tag text-lg font-bold text-white tracking-wider uppercase">LeetCode Profile</h3>
              <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Consistent problem solver focused on Data Structures & Algorithms.
              </p>
              
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="inline-flex items-center justify-center sm:justify-start">
                  <a
                    href="https://leetcode.com/u/Aditya_1901/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 font-mono-accent text-sm font-bold text-white bg-white/5 border border-white/10 hover:border-white rounded shadow-sm transition-colors"
                  >
                    46+ Problems Solved
                  </a>
                </div>

                {/* Focus Tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    Java
                  </span>
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    DSA
                  </span>
                  <span className="px-2.5 py-1 text-xs font-tag font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                    Problem Solving
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
