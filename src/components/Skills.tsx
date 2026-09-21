"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./GlassCard";

interface SkillItem {
  name: string;
  icon: string;
}

interface TabContent {
  id: string;
  label: string;
  icon: string;
  skills: SkillItem[];
}

const tabs: TabContent[] = [
  {
    id: "frontend",
    label: "Front End",
    icon: "🌐",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Responsive Design", icon: "custom/responsive" },
      { name: "Bootstrap", icon: "bootstrap" }
    ]
  },
  {
    id: "backend",
    label: "Back End & APIs",
    icon: "⚙",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express/white" },
      { name: "REST APIs", icon: "custom/apis" }
    ]
  },
  {
    id: "languages",
    label: "Programming Languages",
    icon: "</>",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "custom/java" },
      { name: "C", icon: "c" }
    ]
  },
  {
    id: "database",
    label: "Databases",
    icon: "🗄",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" }
    ]
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: "☁",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github/white" },
      { name: "VS Code", icon: "visualstudiocode" },
      { name: "AWS", icon: "custom/aws" }
    ]
  }
];

function SkillIcon({ icon, name }: { icon: string; name: string }) {
  if (icon === "custom/java") {
    return (
      <img 
        src="/java.png" 
        alt={`${name} icon`} 
        className="w-8 h-8 object-contain"
      />
    );
  }
  if (icon === "custom/responsive") {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    );
  }
  if (icon === "custom/aws") {
    return (
      <img 
        src="/aws.png" 
        alt={`${name} icon`} 
        className="w-8 h-8 object-contain"
      />
    );
  }
  if (icon === "custom/apis") {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0abde3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  }

  const url = `https://cdn.simpleicons.org/${icon}`;
  return (
    <img 
      src={url} 
      alt={`${name} icon`} 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement;
        if (parent) {
          const fallbackSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          fallbackSvg.setAttribute("width", "28");
          fallbackSvg.setAttribute("height", "28");
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

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("frontend");
  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section id="skills" className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wide uppercase"
          >
            Skills
          </motion.h2>
        </div>

        {/* Tab Bar Container */}
        <div className="w-full flex justify-center pb-4">
          <div className="flex flex-wrap justify-center items-center bg-white/5 border border-white/10 rounded-3xl p-1.5 backdrop-blur-md gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-tag text-xs tracking-wider transition-colors duration-300 select-none cursor-pointer ${
                    isActive ? "text-black font-bold z-10" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {/* Sliding Tab Highlight */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white border border-white/20 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Skills Panel Card */}
        <div className="w-full max-w-4xl min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <GlassCard className="w-full flex flex-col gap-6" hoverEffect={false}>
                {/* Active Panel Name Header */}
                <h3 className="font-tag text-xl font-bold text-white tracking-wider border-b border-white/5 pb-4 uppercase">
                  {currentTab.label}
                </h3>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                  {currentTab.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sIdx * 0.05, ease: "easeOut" }}
                      whileHover={{ y: -4 }}
                      className="glass-panel !p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default"
                    >
                      {/* Circular glass badge icon */}
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                        <SkillIcon icon={skill.icon} name={skill.name} />
                      </div>

                      {/* Skill Name */}
                      <span className="font-tag text-sm sm:text-base text-white font-bold tracking-wide">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
