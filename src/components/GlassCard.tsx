"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  id?: string;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  delay = 0,
  id
}: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 1.02, 0.43, 1.01]
      }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }
          : undefined
      }
      className={`glass-panel p-6 sm:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
