"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectTech {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  domain: string;
  description: string;
  bullets: string[];
  tech: ProjectTech[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
  glowColor: string; // Tailwind class for glow color background
  problemStatement?: string;
  tag?: string;
  subTitle?: string;
}

const projects: Project[] = [
  {
    title: "Log Monitoring Dashboard",
    domain: "github.com/Adityaaop",
    tag: "Security & Observability",
    subTitle: "July 2026",
    description: "An interactive SIEM dashboard designed to extract, parse, and visualize Linux authentication logs and detect brute-force spikes in real-time.",
    problemStatement: "Raw authentication logs are voluminous and noisy — detecting brute-force spikes and anomalous authorization attempts in real-time requires clear, pattern-oriented visual telemetry.",
    bullets: [
      "Built an interactive dashboard UI to visualize failed-login spikes over time, translating raw log data into clear, readable charts and event panels.",
      "Designed the layout and data views for the dashboard, focusing on readability and quick pattern recognition for the end user.",
      "Extracted, parsed, and indexed Linux Auth Logs for anomaly tracking and suspicious access events.",
      "Constructed custom HTML/CSS dashboard panels and Splunk visualization queries for rapid incident response."
    ],
    tech: [
      { name: "Splunk", icon: "splunk" },
      { name: "Linux", icon: "linux" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" }
    ],
    liveUrl: "https://github.com/Adityaaop",
    githubUrl: "https://github.com/Adityaaop",
    images: [
      "/projects/log-monitor.jpg"
    ],
    glowColor: "from-cyan-500/[0.08] via-transparent to-transparent"
  },
  {
    title: "Real-time Timetable Generator",
    domain: "github.com/Adityaaop/timetable-gen",
    tag: "Full-Stack Automation",
    subTitle: "Academic Schedule Engineering",
    description: "Full-stack automated scheduling platform engineered with Node.js, Express, and MongoDB to generate clash-free academic timetables with real-time slot optimization.",
    problemStatement: "Manual academic scheduling across multi-batch university departments causes recurring room collisions and faculty assignment overlaps that take days of manual coordination.",
    bullets: [
      "Engineered a collision-free timetable allocation engine using Node.js and Express to compute slot matrices for courses and faculty.",
      "Implemented MongoDB & Mongoose schemas to persist student batches, course codes, classroom capacities, and faculty preferences.",
      "Created clean RESTful API endpoints for dynamic timetable drafting, updating, and instant conflict alerts.",
      "Built a responsive front-end interface allowing administrators and students to visualize weekly schedules by department and semester."
    ],
    tech: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express/white" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "JavaScript", icon: "javascript" },
      { name: "REST APIs", icon: "postman" }
    ],
    liveUrl: "https://github.com/Adityaaop/timetable-gen",
    githubUrl: "https://github.com/Adityaaop/timetable-gen",
    images: [
      "/projects/timetable-gen.jpg"
    ],
    glowColor: "from-indigo-500/[0.08] via-transparent to-transparent"
  },
  {
    title: "Dark Buster Cyber Platform",
    domain: "github.com/Adityaaop",
    tag: "Hackathon Winner • 3rd Position",
    subTitle: "IIT BHU Dark Buster Hackathon",
    description: "Award-winning cyber threat intelligence and anomaly detection interface built for the national Dark Buster Hackathon organized by IIT BHU.",
    problemStatement: "Identifying stealthy intrusion attempts and anomalous network signatures requires real-time visual correlation between event frequency, source heuristics, and alert urgency.",
    bullets: [
      "Secured 3rd Position nationally at the prestigious Dark Buster Hackathon organized by IIT BHU.",
      "Designed and built an interactive anomaly monitoring interface providing real-time triage for high-risk system events.",
      "Engineered efficient event aggregation workflows to group concurrent security anomalies into actionable visual incidents.",
      "Implemented rapid-filter query views and responsive UI cards to streamline investigative workflows."
    ],
    tech: [
      { name: "React.js", icon: "react" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Tailwind CSS", icon: "tailwindcss" }
    ],
    liveUrl: "https://github.com/Adityaaop",
    githubUrl: "https://github.com/Adityaaop",
    images: [
      "/projects/dark-buster.jpg"
    ],
    glowColor: "from-red-500/[0.08] via-transparent to-transparent"
  },
  {
    title: "Dynamic Web Application Suite",
    domain: "github.com/Adityaaop",
    tag: "Frontend Developer Internship",
    subTitle: "YBI Foundation — June – July 2025",
    description: "Suite of responsive, database-driven web applications built during frontend engineering internship, integrating Node.js backend services with MySQL databases.",
    problemStatement: "Delivering performant web applications with seamless client-side user experience while ensuring robust schema communication with relational database systems.",
    bullets: [
      "Developed responsive, accessible web applications using semantic HTML5, modern CSS3, and JavaScript (ES6+), following clean and maintainable coding practices.",
      "Built and integrated backend services with Node.js and Express, connecting front-end views to MySQL databases for dynamic data handling.",
      "Managed version control with Git and GitHub, streamlining team collaboration, branch management, and code reviews.",
      "Deployed and verified applications on cloud infrastructure, ensuring rapid load times and cross-browser stability."
    ],
    tech: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "MySQL", icon: "mysql" },
      { name: "Git", icon: "git" }
    ],
    liveUrl: "https://github.com/Adityaaop",
    githubUrl: "https://github.com/Adityaaop",
    images: [
      "/projects/ybi-portal.jpg"
    ],
    glowColor: "from-emerald-500/[0.08] via-transparent to-transparent"
  }
];

function TechIcon({ icon, name }: { icon: string; name: string }) {

  const url = `https://cdn.simpleicons.org/${icon}`;
  return (
    <img 
      src={url} 
      alt={`${name} icon`} 
      className="w-4.5 h-4.5 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement;
        if (parent) {
          const fallbackSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          fallbackSvg.setAttribute("width", "16");
          fallbackSvg.setAttribute("height", "16");
          fallbackSvg.setAttribute("viewBox", "0 0 24 24");
          fallbackSvg.setAttribute("fill", "none");
          fallbackSvg.setAttribute("stroke", "#C0C0C0");
          fallbackSvg.setAttribute("stroke-width", "2");
          fallbackSvg.setAttribute("stroke-linecap", "round");
          fallbackSvg.setAttribute("stroke-linejoin", "round");
          
          const poly1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
          poly1.setAttribute("points", "16 18 22 12 16 6");
          const poly2 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
          poly2.setAttribute("points", "8 6 2 12 8 18");
          
          fallbackSvg.appendChild(poly1);
          fallbackSvg.appendChild(poly2);
          parent.appendChild(fallbackSvg);
        }
      }}
    />
  );
}

// Interactive Mouse-Move Tilt Container for Browser Mockups
function TiltBrowserFrame({ children, glowColor }: { children: React.ReactNode; glowColor: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Smooth limit of 6 degrees max tilt to avoid extreme angles
    const maxTilt = 6;
    const tiltX = -(y / (box.height / 2)) * maxTilt;
    const tiltY = (x / (box.width / 2)) * maxTilt;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full group">
      {/* Background Soft Glow Blob */}
      <div className={`absolute inset-[-20px] rounded-3xl bg-gradient-to-tr ${glowColor} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      
      {/* Inner Tilt Wrapper */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-full relative glass-panel !p-0 overflow-hidden border border-white/12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectSlideshow({ images, title }: { images: string[]; title: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2500); // Rotates every 2.5 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIdx]}
            alt={`${title} Mockup ${currentIdx + 1}`}
            fill
            sizes="(max-w-1024px) 100vw, 650px"
            className="object-cover transition-all duration-500 bg-zinc-950"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop";
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIdx ? "bg-white scale-110" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-32 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center gap-24 md:gap-32 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wide uppercase"
          >
            STUFF I&apos;VE BUILT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            A few things I&apos;ve shipped, broken, and fixed again.
          </motion.p>
        </div>

        {/* Project Blocks Vertical List */}
        <div className="w-full flex flex-col gap-28 md:gap-36">
          {projects.map((project, idx) => {
            const isOdd = idx % 2 === 0;
            const hasLive = project.liveUrl !== "#" && project.liveUrl !== "";
            const hasGithub = project.githubUrl !== "#" && project.githubUrl !== "";
            
            return (
              <div 
                key={project.title}
                className={`w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
                  isOdd ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* Column 1: Browser Mockup Frame (60% width on Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, x: isOdd ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-[58%] flex-shrink-0"
                >
                  <TiltBrowserFrame glowColor={project.glowColor}>
                    {/* Fake Browser Header */}
                    <div className="w-full flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/5 backdrop-blur-md">
                      {/* 3 Traffic light dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-zinc-700" />
                        <span className="w-3 h-3 rounded-full bg-zinc-600" />
                        <span className="w-3 h-3 rounded-full bg-zinc-500" />
                      </div>
                      
                      {/* Fake Address Bar */}
                      <div className="flex-1 max-w-[280px] sm:max-w-[320px] mx-4">
                        <div className="w-full bg-white/5 border border-white/10 rounded-lg py-1 px-3 flex items-center justify-center font-body text-xs text-zinc-300 select-none">
                          {project.domain}
                        </div>
                      </div>

                      {/* Small Avatar icon placeholder */}
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                        <span className="text-xs text-zinc-300">👤</span>
                      </div>
                    </div>

                    {/* Image / Web Page content */}
                    <div className="relative group/preview overflow-hidden w-full h-full">
                      <ProjectSlideshow images={project.images} title={project.title} />
                      
                      {/* Hover view code tab overlay */}
                      {hasGithub ? (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/45 opacity-0 group-hover/preview:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center z-20"
                        >
                          <span className="px-5 py-2.5 rounded-full bg-white text-black font-tag font-bold text-xs sm:text-sm tracking-wider shadow-2xl transform translate-y-4 group-hover/preview:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-zinc-100 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            View Code ↗
                          </span>
                        </a>
                      ) : hasLive ? (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/45 opacity-0 group-hover/preview:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center z-20"
                        >
                          <span className="px-5 py-2.5 rounded-full bg-white text-black font-tag font-bold text-xs sm:text-sm tracking-wider shadow-2xl transform translate-y-4 group-hover/preview:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-zinc-100 flex items-center gap-1.5">
                            Visit Site ↗
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </TiltBrowserFrame>
                </motion.div>

                {/* Column 2: Info Panel (40% width on Desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="w-full lg:flex-1 flex flex-col gap-6"
                >
                  {/* Title & Direct Button */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        {/* Vertical Accent Line */}
                        <div className="w-1.5 h-8 bg-zinc-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase flex flex-wrap items-center gap-3">
                          {project.title}
                          {project.tag && (
                            <span className="font-tag text-xs lowercase px-2.5 py-1 rounded-full border border-white/12 text-zinc-300 font-normal tracking-wide normal-case bg-white/5">
                              {project.tag}
                            </span>
                          )}
                        </h3>
                      </div>
                      {project.subTitle && (
                        <p className="font-body text-xs text-zinc-400 font-semibold tracking-wider uppercase pl-[18px] leading-tight">
                          {project.subTitle}
                        </p>
                      )}
                    </div>

                    {/* Outlined Action Pill */}
                    {hasLive || hasGithub ? (
                      <a
                        href={hasLive ? project.liveUrl : project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-tag text-sm font-bold text-zinc-300 hover:text-white bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      >
                        {hasLive ? "Check out" : "View Code"} ↗
                      </a>
                    ) : (
                      <span className="px-4 py-1.5 rounded-full font-tag text-xs uppercase font-bold text-zinc-400 bg-white/5 border border-white/5 cursor-default select-none tracking-wider">
                        Prototype
                      </span>
                    )}
                  </div>

                  {/* Short Subheading description */}
                  <p className="font-body text-sm text-zinc-400 tracking-wide border-b border-white/5 pb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Problem Statement if available */}
                  {project.problemStatement && (
                    <p className="text-xs sm:text-sm font-body italic text-zinc-500 leading-relaxed -mt-2 -mb-1">
                      {project.problemStatement}
                    </p>
                  )}

                  {/* Specific Key details list */}
                  <ul className="flex flex-col gap-3.5">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-zinc-300 leading-relaxed">
                        <span className="text-zinc-400 mt-0.5 select-none font-bold font-mono-accent">+</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-2 pt-3 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/12 rounded-full font-tag text-xs text-zinc-200 transition-colors"
                      >
                        <TechIcon icon={t.icon} name={t.name} />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>

                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
