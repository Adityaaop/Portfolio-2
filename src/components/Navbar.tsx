"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Volume2, VolumeX } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Intro", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasHoveredOnce, setHasHoveredOnce] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(true); // ON BY DEFAULT!
  const isPausedByHover = useRef(false);
  const userExplicitlyMuted = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    // Initialize audio and attempt autoplay
    const audio = new Audio("/just-chillin.mp3");
    audio.loop = true;
    audio.volume = 0.05; // lower volume!
    audio.muted = false; // unmuted by default
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsAudioActive(true);
        })
        .catch(() => {
          // Autoplay blocked. Keep isAudioActive = true (shows active in UI).
          // We will trigger unmuted play on the first interaction.
          setIsAudioActive(true);
        });
    }

    const handleFirstInteraction = () => {
      if (audio.paused && !userExplicitlyMuted.current) {
        audio.muted = false;
        audio.play()
          .then(() => {
            setIsAudioActive(true);
          })
          .catch((err) => console.log("Play failed on interaction", err));
      }
      cleanupInteractionListeners();
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      cleanupInteractionListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (showVideo && videoRef.current) {
      videoRef.current.volume = 0.5;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.log("Video playback blocked", err);
      });
      // Pause ambient audio
      if (audio && !audio.paused) {
        audio.pause();
        isPausedByHover.current = true;
        setIsAudioActive(false);
      }
    } else if (!showVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      // Resume ambient audio
      if (audio && isPausedByHover.current && !userExplicitlyMuted.current) {
        audio.muted = false;
        audio.play()
          .then(() => {
            setIsAudioActive(true);
            isPausedByHover.current = false;
          })
          .catch((err) => console.log("Failed to resume after hover", err));
      }
    }
  }, [showVideo]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioActive) {
      audio.pause();
      setIsAudioActive(false);
      userExplicitlyMuted.current = true;
      isPausedByHover.current = false;
    } else {
      audio.muted = false;
      audio.play()
        .then(() => {
          setIsAudioActive(true);
          userExplicitlyMuted.current = false;
          isPausedByHover.current = false;
        })
        .catch((err) => console.log("Failed to play on toggle", err));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Floating Glass Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-7xl px-4 py-3 rounded-[24px] transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border border-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-white/5 backdrop-blur-md border border-white/5"
        } flex items-center justify-between`}
      >
        {/* Brand / Logo Container */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => {
            if (isDesktop) {
              setHasHoveredOnce(true);
              setShowVideo(true);
            }
          }}
          onMouseLeave={() => {
            if (isDesktop) {
              setShowVideo(false);
            }
          }}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home");
            }}
            className="flex items-center gap-2 pl-2"
          >
            <span className="font-display text-xl font-bold tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              ADITYA
            </span>
          </a>

          {/* Cinema Screen Video Popup Easter Egg */}
          <AnimatePresence>
            {showVideo && hasHoveredOnce && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-[calc(100%+12px)] left-2 w-[320px] sm:w-[360px] aspect-[2.35/1] bg-black p-1.5 border border-white/12 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md z-50 pointer-events-none"
              >
                {/* Cinema Screen Glare/Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent pointer-events-none rounded-xl z-10" />
                
                <video
                  ref={videoRef}
                  src="/Batman.mp4"
                  preload="auto"
                  playsInline
                  loop
                  className="w-full h-full object-cover rounded-lg bg-black"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative px-3 py-1.5 font-tag text-sm tracking-wider transition-colors duration-300 rounded-full hover:text-white ${
                  isActive ? "text-white font-bold" : "text-zinc-400"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Button: Resume */}
        <div className="hidden lg:flex items-center gap-3 pr-2">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2 text-zinc-400 hover:text-white rounded-full border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle ambient music"
          >
            {isAudioActive ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
          </button>

          <a
            href="/Aditya.pdf"
            download="Aditya_Ranjan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 font-tag text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 hover:border-white hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <Download size={14} className="animate-bounce" />
            Resume
          </a>
        </div>

        {/* Mobile Sound + Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 text-zinc-400 hover:text-white rounded-full border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle ambient music"
          >
            {isAudioActive ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop filter overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-45 lg:hidden"
            />

            {/* Slide-in Glass Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-black/80 border-l border-white/10 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pt-4 border-b border-white/5 pb-4">
                  <span className="font-display text-xl font-bold text-white">
                    ADITYA
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-full border border-white/10"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Staggered Navigation Items */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`py-2 px-3 font-tag text-sm tracking-wider rounded-xl transition-all duration-200 border ${
                          isActive
                            ? "bg-white/10 border-white/20 text-white font-bold pl-4"
                            : "border-transparent text-zinc-400 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Resume Button in Drawer */}
              <div className="pb-8">
                <a
                  href="/Aditya.pdf"
                  download="Aditya_Ranjan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 font-tag text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-xl hover:border-white hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
