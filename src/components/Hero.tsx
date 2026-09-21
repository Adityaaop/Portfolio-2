"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

const cyclingWords = [
  { text: "Hey,", font: "var(--font-hero)" },
  { text: "Namaste,", font: "var(--font-kalam)" },
  { text: "Hola,", font: "var(--font-handwritten)" },
  { text: "Bonjour,", font: "var(--font-accent-bold)" },
  { text: "Ciao,", font: "var(--font-subheading)" },
  { text: "Oi,", font: "var(--font-ui)" },
  { text: "Konnichiwa,", font: "var(--font-body)" },
];

const wordVariants = {
  enter: { filter: "blur(8px)", opacity: 0, y: 12, scale: 0.95 },
  center: { filter: "blur(0px)", opacity: 1, y: 0, scale: 1 },
  exit: { filter: "blur(8px)", opacity: 0, y: -12, scale: 0.95 }
};

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Spotlight effect states and coordinates
  const textSectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !textSectionRef.current) return;
    const rect = textSectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const circleX = useTransform(mouseXSpring, (x) => x - 75);
  const circleY = useTransform(mouseYSpring, (y) => y - 75);
  const clipPath = useMotionTemplate`circle(75px at ${mouseXSpring}px ${mouseYSpring}px)`;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-glow-soft"
    >
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">

        {/* Left Column - Main Intro (Tracks coordinates and hovers) */}
        <div
          ref={textSectionRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="md:col-span-7 flex flex-col items-start text-left gap-6 order-2 md:order-1 relative select-none overflow-visible"
        >

          {/* BASE LAYER (Normal White/Silver Theme) */}
          {/* Greeting Header */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/90 uppercase flex flex-col items-start select-none leading-[1.1] gap-y-1.5">
            <span className="relative h-[1.15em] overflow-visible inline-block min-w-[200px] sm:min-w-[280px] lg:min-w-[340px]">
              {prefersReducedMotion ? (
                <span style={{ fontFamily: cyclingWords[0].font }}>Hey,</span>
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={wordIndex}
                    variants={wordVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ fontFamily: cyclingWords[wordIndex].font }}
                    className="inline-block"
                  >
                    {cyclingWords[wordIndex].text}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
            <span>I&apos;m Aditya Ranjan </span>
          </h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-doto text-lg sm:text-xl lg:text-2xl text-zinc-200 tracking-wide font-semibold pl-2 -mt-2"
          >
            Full Stack Developer & SOC
          </motion.h2>

          {/* Summary Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-body text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed"
          >
            Computer Science undergraduate with hands-on experience building responsive, user-friendly web interfaces using HTML, CSS, and JavaScript, along with backend integration using Node.js and MySQL. Focused on React.js and modern front-end engineering.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 relative"
          >
            <a
              href="/Aditya.pdf"
              download="Aditya_Ranjan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-white bg-white/5 border border-white/15 hover:border-white hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <FileText size={18} />
              Download Resume
            </a>

            <button
              onClick={handleScrollToContact}
              className="flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-zinc-300 bg-white/5 border border-white/12 hover:border-white hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] group cursor-pointer"
            >
              Get In Touch
              <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* SPOTLIGHT LAYERS (Desktop pointer devices only) */}
          {isDesktop && (
            <>
              {/* Middle Layer: Solid Yellow Circle (No fades, no shades, no blur) */}
              <motion.div
                style={{
                  x: circleX,
                  y: circleY,
                  width: 150,
                  height: 150,
                  backgroundColor: "#facc15"
                }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute top-0 left-0 rounded-full z-10"
              />

              {/* Top Layer: Black text and red buttons inside spotlight */}
              <motion.div
                style={{ clipPath }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute inset-0 flex flex-col items-start text-left gap-6 z-20 overflow-visible"
              >
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black uppercase flex flex-col items-start select-none leading-[1.1] gap-y-1.5">
                  <span className="relative h-[1.15em] overflow-visible inline-block min-w-[200px] sm:min-w-[280px] lg:min-w-[340px]">
                    {prefersReducedMotion ? (
                      <span style={{ fontFamily: cyclingWords[0].font }}>Hey,</span>
                    ) : (
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={wordIndex}
                          variants={wordVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          style={{ fontFamily: cyclingWords[wordIndex].font }}
                          className="inline-block"
                        >
                          {cyclingWords[wordIndex].text}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                  <span>I&apos;m Aditya Ranjan</span>
                </h1>

                {/* Subheading */}
                <h2 className="font-doto text-lg sm:text-xl lg:text-2xl text-black tracking-wide font-semibold pl-2 -mt-2">
                  Full Stack Developer & SOC
                </h2>

                {/* Summary Line */}
                <p className="font-body text-xs sm:text-sm text-black max-w-xl leading-relaxed">
                  Computer Science undergraduate with hands-on experience building responsive, user-friendly web interfaces using HTML, CSS, and JavaScript, along with backend integration using Node.js and MySQL. Focused on React.js and modern front-end engineering.
                </p>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 relative">
                  <div className="flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-white bg-red-600 border border-red-700 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    <FileText size={18} />
                    Download Resume
                  </div>

                  <div className="flex items-center justify-center gap-2 px-6 py-3.5 font-tag text-base font-bold text-white bg-red-600 border border-red-700 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    Get In Touch
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Right Column - Avatar & Easter Egg */}
        <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-2 relative py-8">

          {/* Avatar Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-72 aspect-[4/5] sm:w-[380px] lg:w-[420px] rounded-3xl overflow-hidden"
          >
            <div className="w-full h-full relative">
              <Image
                src="/portrait.webp"
                alt="Aditya Ranjan"
                fill
                priority
                unoptimized
                sizes="(max-w-768px) 256px, 320px"
                className="object-cover scale-105 hover:scale-110 transition-transform duration-500 mix-blend-screen"
                style={{
                  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  filter: "contrast(1.15) brightness(0.9)"
                }}
              />
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute inset-0 rounded-3xl bg-white/[0.02] blur-xl -z-10" />
          </motion.div>

          {/* Easter Egg: Pixel Character */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-[-15px] sm:bottom-[-25px] flex flex-col items-center gap-1 bg-black/80 border border-white/12 backdrop-blur-md px-3 py-1.5 rounded-2xl cursor-help shadow-lg group"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 16 16"
              className="w-12 h-12 select-none"
            >
              {/* Hair (gray pixels) */}
              <rect x="5" y="1" width="6" height="2" fill="#555" />
              <rect x="4" y="2" width="8" height="2" fill="#555" />
              {/* Skin tone (face) */}
              <rect x="5" y="4" width="6" height="3" fill="#ffe0bd" />
              {/* Eyes */}
              <rect x="6" y="5" width="1" height="1" fill="#000" />
              <rect x="9" y="5" width="1" height="1" fill="#000" />
              {/* Shirt (metallic/silver grey) */}
              <rect x="4" y="7" width="8" height="4" fill="#C0C0C0" />
              <rect x="3" y="8" width="1" height="2" fill="#C0C0C0" />
              <rect x="12" y="8" width="1" height="2" fill="#C0C0C0" />
              {/* Hands (skin tone) */}
              <rect x="3" y="10" width="1" height="1" fill="#ffe0bd" />
              <rect x="12" y="10" width="1" height="1" fill="#ffe0bd" />
              {/* Pants (black) */}
              <rect x="5" y="11" width="6" height="3" fill="#111" />
              {/* Feet (shoes) */}
              <rect x="4" y="14" width="2" height="1" fill="#ffffff" />
              <rect x="10" y="14" width="2" height="1" fill="#ffffff" />

              {/* Mini Laptop */}
              <g className="group-hover:translate-y-[-1px] transition-transform">
                <rect x="7" y="10" width="4" height="1" fill="#222" />
                <rect x="8" y="8" width="3" height="2" fill="#ffffff" className="animate-pulse" />
              </g>
            </svg>
            <span className="font-tag text-xs tracking-widest text-zinc-300 uppercase">
              idle.exe
            </span>

            {/* Speech bubble on hover - Styled with monospace font-data */}
            <div className="absolute bottom-[54px] scale-0 group-hover:scale-100 origin-bottom transition-transform duration-200 bg-white text-black font-data text-xs py-1.5 px-3 rounded-xl whitespace-nowrap shadow-md select-none border border-black font-semibold">
              console.log(&quot;Welcome to my portfolio!&quot;);
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
