"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Users, CheckCircle2, Building2 } from "lucide-react";
import GlassCard from "./GlassCard";

interface ExperienceItem {
  role: string;
  organization: string;
  type: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
  badgeColor?: string;
  icon: typeof Briefcase;
}

const experiences: ExperienceItem[] = [
  {
    role: "Frontend Developer Intern",
    organization: "YBI Foundation",
    type: "Internship",
    duration: "June 2025 – July 2025",
    location: "Remote",
    description: [
      "Developed responsive, high-performance web applications using HTML, CSS, and JavaScript, following clean and maintainable coding practices.",
      "Built and integrated backend services with Node.js/Express, seamlessly connecting front-end views to MySQL databases for dynamic data handling.",
      "Managed team version control with Git/GitHub and deployed applications to cloud platforms, streamlining the development and testing workflow."
    ],
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Node.js", "Express.js", "MySQL", "Git & GitHub", "Cloud Deployment"],
    icon: Briefcase
  },
  {
    role: "Member",
    organization: "Gameforge Community — IILM University",
    type: "Leadership & Community",
    duration: "Feb 2025 – Present",
    location: "Greater Noida, India",
    description: [
      "Actively engaging in university tech discussions, game development workshops, and collaborative coding initiatives.",
      "Collaborating with student developers to build engaging digital interfaces and participating in peer code reviews.",
      "Organizing and contributing to campus hackathons and community interactive events."
    ],
    skills: ["Game Development", "Collaborative Coding", "Interactive UI", "Community Building"],
    icon: Users
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase"
          >
            EXPERIENCE & LEADERSHIP
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Hands-on professional experience, internships, and university community involvement.
          </motion.p>
        </div>

        {/* Experience List */}
        <div className="w-full flex flex-col gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="w-full"
              >
                <GlassCard className="flex flex-col gap-6 !p-8 hover:border-white/30 transition-all duration-300">
                  {/* Top Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white shadow-inner shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-tag text-xl sm:text-2xl font-bold text-white tracking-wide">
                            {exp.role}
                          </h3>
                          <span className="px-3 py-0.5 rounded-full text-xs font-tag font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-zinc-200">
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300 font-body text-sm sm:text-base font-semibold">
                          <Building2 size={16} className="text-zinc-500" />
                          <span>{exp.organization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Duration & Location Pills */}
                    <div className="flex flex-wrap md:flex-col md:items-end gap-2 text-xs font-tag text-zinc-400">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        <Calendar size={13} className="text-zinc-400" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        <MapPin size={13} className="text-zinc-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="flex flex-col gap-3">
                    {exp.description.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-zinc-400 mt-1 shrink-0" />
                        <p className="font-body text-sm sm:text-base text-zinc-300 leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Skills/Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full font-tag text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
