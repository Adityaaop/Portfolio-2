"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import GlassCard from "./GlassCard";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  current?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2020 – 2021",
    title: "Class X — Secondary School",
    description: "Completed Class X secondary education at Indian Public School, Madhubani, India."
  },
  {
    date: "2021 – 2023",
    title: "Class XII — Senior Secondary",
    description: "Completed Class XII senior secondary education at Vivekanand Mission Vidyapeeth, Madhubani, India."
  },
  {
    date: "2023",
    title: "Started B.Tech in CSE at IILM University",
    description: "Enrolled in B.Tech in Computer Science and Engineering at IILM University, Greater Noida (Current CGPA: 7.8)."
  },
  {
    date: "Feb 2025",
    title: "Joined Gameforge Community",
    description: "Became an active member of Gameforge Community at IILM University, participating in game dev workshops and collaborative tech activities."
  },
  {
    date: "May 2025",
    title: "AWS Cloud Practitioner Essentials",
    description: "Earned AWS Cloud Practitioner Essentials certification through Amazon AWS Training, learning core cloud architecture."
  },
  {
    date: "June – July 2025",
    title: "Frontend Developer Intern — YBI Foundation",
    description: "Developed responsive web applications with HTML/CSS/JS, integrated Node.js/Express with MySQL databases, and managed Git/GitHub workflows."
  },
  {
    date: "2025",
    title: "3rd Position — Dark Buster Hackathon",
    description: "Secured 3rd Position in the prestigious Dark Buster Hackathon organized by IIT BHU."
  },
  {
    date: "July 2026",
    title: "Shipped Log Monitoring Dashboard",
    description: "Built an interactive Splunk and HTML/CSS dashboard to visualize failed-login spikes over time using Linux Auth Logs."
  },
  {
    date: "August 2026",
    title: "Full Stack Web Development — Udemy",
    description: "Completed comprehensive full stack web development certification covering modern front-end and back-end practices."
  },
  {
    date: "Present",
    title: "Targeting Full Stack & SOC Roles",
    description: "Actively building full-stack web applications, cybersecurity log analysis systems, and responsive modern interfaces.",
    current: true
  }
];

// Node glowing variants
const nodeVariants = {
  hidden: { 
    scale: 0.8,
    backgroundColor: "rgb(24, 24, 27)", 
    borderColor: "rgb(63, 63, 70)", 
    boxShadow: "none"
  },
  visible: { 
    scale: 1.1,
    backgroundColor: "rgb(255, 255, 255)", 
    borderColor: "rgb(255, 255, 255)", 
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
    transition: { type: "spring" as const, stiffness: 200, delay: 0.1 }
  }
};

export default function HistoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen width to handle collapse to single column
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // useScroll hook to drive timeline fill animation based on user scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="history" ref={containerRef} className="relative w-full py-24 px-6 flex flex-col items-center overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col items-center gap-16 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wide uppercase"
          >
            My History
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            A chronological timeline of milestones, projects, and educational events.
          </motion.p>
        </div>

        {/* Timeline Event Flow Wrapper */}
        <div className="relative w-full mt-10">
          
          {/* Base Unfilled Timeline Track Line (Dim/Muted) */}
          <div className="absolute left-[24px] sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-700/40 rounded-full" />

          {/* Active Filled Timeline Track Line (Glows/Fills on scroll) */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[24px] sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-white via-zinc-200 to-white/10 shadow-[0_0_12px_rgba(255,255,255,0.5)] rounded-full"
          />

          {/* Events Iteration */}
          <div className="flex flex-col gap-14 w-full">
            {timelineEvents.map((event, idx) => {
              // Alternate odd/even side rendering on desktop
              const isEven = idx % 2 === 0;
              const slideLeft = isEven && !isMobile;
              
              return (
                <div 
                  key={idx} 
                  className={`relative flex items-center justify-start sm:justify-between w-full ${
                    slideLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  }`}
                >
                  
                  {/* Timeline Dot Node (Lights up when scrolled into view) */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={nodeVariants}
                    className={`absolute left-[24px] sm:left-1/2 -translate-x-1/2 rounded-full border-2 z-10 flex items-center justify-center bg-black transition-colors ${
                      event.current 
                        ? 'w-6 h-6 border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' 
                        : 'w-4 h-4'
                    }`}
                  >
                    {event.current && (
                      <span className="w-full h-full rounded-full bg-white/30 animate-ping absolute inset-0" />
                    )}
                  </motion.div>

                  {/* Desktop Layout Empty Column Spacer */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Event Detail Glass Card */}
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      x: isMobile ? 40 : (slideLeft ? -45 : 45),
                      filter: "blur(4px)" 
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      filter: "blur(0px)" 
                    }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    className={`w-full sm:w-[calc(50%-45px)] pl-16 sm:pl-0 ${
                      slideLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'
                    }`}
                  >
                    <GlassCard delay={0} hoverEffect={true} className="!p-6 relative group overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex flex-col gap-2">
                        {/* Date label in Bitcount Grid Single font */}
                        <span className={`font-mono-accent text-sm font-bold px-3 py-1 rounded inline-block w-fit ${
                          slideLeft ? 'sm:ml-auto' : ''
                        } ${
                          event.current 
                            ? 'bg-white/15 text-white border border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                            : 'bg-white/5 text-zinc-400 border border-white/10'
                        }`}>
                          {event.date}
                        </span>

                        {/* Title in Black Ops One */}
                        <h3 className={`font-display text-lg sm:text-xl font-bold tracking-wide uppercase ${
                          event.current ? 'text-white' : 'text-zinc-200'
                        }`}>
                          {event.title}
                        </h3>

                        {/* Description in Doto font */}
                        <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                          {event.description}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
