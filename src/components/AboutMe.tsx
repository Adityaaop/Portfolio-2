"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, GraduationCap, Phone } from "lucide-react";
import GlassCard from "./GlassCard";

const coreAreas = [
  "Front-End Development", "React.js", "JavaScript (ES6+)", "HTML5 & CSS3", 
  "Responsive Design", "Node.js & Express", "REST APIs", "MySQL & MongoDB", 
  "AWS Cloud", "Git & GitHub", "Python", "Bootstrap"
];

const educationList = [
  {
    degree: "B.Tech Computer Science and Engineering",
    school: "IILM University, Greater Noida, India",
    date: "2023 – 2027",
    scoreType: "CGPA: ",
    scoreVal: "7.8"
  },
  {
    degree: "Class XII — Senior Secondary",
    school: "Vivekanand Mission Vidyapeeth, Madhubani, India",
    date: "2021 – 2023",
    scoreType: "Status: ",
    scoreVal: "Completed"
  },
  {
    degree: "Class X — Secondary School",
    school: "Indian Public School, Madhubani, India",
    date: "2020 – 2021",
    scoreType: "Status: ",
    scoreVal: "Completed"
  }
];

export default function AboutMe() {
  return (
    <section id="about" className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            My Professional Side
          </motion.h2>
        </div>

        {/* Two-Column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Tall Glass Panel (60% width on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 h-full"
          >
            <div className="glass-panel p-8 flex flex-col gap-6 h-full">
              {/* Bio Paragraph */}
              <p className="font-body text-zinc-300 leading-relaxed text-sm sm:text-base">
                I'm a Computer Science undergraduate with hands-on experience building responsive, user-friendly web interfaces using HTML, CSS, and JavaScript, along with backend integration using Node.js and MySQL. Comfortable working across the stack, with a growing focus on React.js, full-stack application development, SOC analysis, and cloud fundamentals in AWS. Looking for opportunities to build secure, scalable solutions and grow as an engineer.
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 w-full" />

              {/* Contact-Style Rows */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-tag text-xs text-zinc-500 uppercase tracking-wider">Email</span>
                    <a href="mailto:adityamishra0578@gmail.com" className="font-body text-sm sm:text-base text-zinc-200 hover:text-accent transition-colors">
                      adityamishra0578@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-tag text-xs text-zinc-500 uppercase tracking-wider">Phone</span>
                    <a href="tel:+916205834084" className="font-body text-sm sm:text-base text-zinc-200 hover:text-accent transition-colors">
                      +91-6205834084
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-tag text-xs text-zinc-500 uppercase tracking-wider">Location</span>
                    <span className="font-body text-sm sm:text-base text-zinc-200">Greater Noida, Uttar Pradesh, India – 201310</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400">
                    <GraduationCap size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-tag text-xs text-zinc-500 uppercase tracking-wider">Education</span>
                    <span className="font-body text-sm sm:text-base text-zinc-200">B.Tech in Computer Science & Engineering</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 w-full" />

              {/* Core Areas */}
              <div className="flex flex-col gap-3">
                <span className="font-tag text-xs text-zinc-400 uppercase tracking-widest font-bold">
                  Core Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {coreAreas.map((area) => (
                    <span 
                      key={area}
                      className="px-3.5 py-1.5 rounded-full font-tag text-sm text-zinc-300 bg-white/5 border border-white/10 hover:border-white hover:text-white transition-colors duration-200 cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column - Education Stack (40% width on Desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl font-bold text-white tracking-wide uppercase pl-2"
            >
              Education
            </motion.h3>
            
            <div className="flex flex-col gap-4">
              {educationList.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="w-full"
                >
                  <div className="glass-panel p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)] cursor-default transition-all duration-300">
                    {/* Degree */}
                    <h4 className="font-body text-sm sm:text-base font-bold text-white leading-snug">
                      {edu.degree}
                    </h4>
                    
                    {/* Institution */}
                    <span className="font-body text-sm sm:text-base text-zinc-300 font-semibold">
                      {edu.school}
                    </span>

                    {/* Meta Detail Row */}
                    <div className="flex items-center justify-between gap-4 pt-1 mt-auto border-t border-white/5">
                      <span className="font-body text-xs sm:text-sm text-zinc-400 font-medium">
                        {edu.date}
                      </span>
                      <span className="font-body text-xs sm:text-sm text-zinc-200 font-medium">
                        {edu.scoreType}
                        <span className="font-mono-accent text-sm sm:text-base font-bold text-white">
                          {edu.scoreVal}
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Buttons to History & Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8 justify-center items-center"
        >
          <Link
            href="/history"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-white bg-white/5 border border-white/12 hover:border-zinc-400 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            📜 View My History →
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-white bg-white/5 border border-white/12 hover:border-zinc-400 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            🏆 View Milestones Showcase →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
