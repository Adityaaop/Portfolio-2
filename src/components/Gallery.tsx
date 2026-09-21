"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar } from "lucide-react";

interface GalleryImage {
  src: string;
  caption: string;
  date: string;
  location: string;
  type?: "image" | "video";
  rotate?: string;
}

interface EventGroup {
  id: string;
  title: string;
  shortName: string;
  caption: string;
  images: GalleryImage[];
}

const eventGroups: EventGroup[] = [
  {
    id: "dark-buster-2025",
    title: "Dark Buster Hackathon — IIT BHU",
    shortName: "IIT BHU '25",
    caption: "Secured 3rd Position nationally at the prestigious cybersecurity hackathon organized by IIT BHU.",
    images: [
      {
        src: "/gallary/milestones/hackathon-bhu.jpg",
        caption: "3rd Position National Podium Award — Dark Buster Hackathon championship honors",
        date: "2025",
        location: "IIT BHU, Varanasi"
      }
    ]
  },
  {
    id: "ybi-internship",
    title: "Frontend Engineering Internship",
    shortName: "YBI Internship",
    caption: "Built production-grade responsive web apps, integrated Node.js/MySQL backends, and deployed cloud services.",
    images: [
      {
        src: "/gallary/milestones/frontend-internship.jpg",
        caption: "Frontend Web Developer Internship — Full-stack interface engineering & MySQL integration",
        date: "June – July 2025",
        location: "YBI Foundation (Remote)"
      }
    ]
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Practitioner Essentials",
    shortName: "AWS Cloud",
    caption: "Mastering cloud architecture fundamentals, IAM security, compute infrastructure, and AWS cloud deployment.",
    images: [
      {
        src: "/gallary/milestones/aws-cloud.jpg",
        caption: "Amazon Web Services Training & Certification — Cloud Practitioner Essentials validation",
        date: "May 2025",
        location: "Amazon AWS Training"
      }
    ]
  },
  {
    id: "gameforge-community",
    title: "Gameforge Community — IILM University",
    shortName: "Gameforge",
    caption: "Active member driving campus tech workshops, collaborative coding sessions, and interactive game engineering.",
    images: [
      {
        src: "/gallary/milestones/gameforge-lab.jpg",
        caption: "Collaborative developer workshop and student innovation lab sessions",
        date: "Feb 2025 – Present",
        location: "IILM University, Greater Noida"
      }
    ]
  }
];

// Flat list of all images for lightbox navigation
const allImages = eventGroups.flatMap(group => group.images);

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeDetailIdx, setActiveDetailIdx] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % allImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);
    }
  };

  // Handle smooth scroll to section
  const handleScrollToSection = (id: string) => {
    setActiveFilter(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight" && selectedImage !== null) {
        setSelectedImage((selectedImage + 1) % allImages.length);
      }
      if (e.key === "ArrowLeft" && selectedImage !== null) {
        setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Track active section on scroll to highlight filter link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const group of eventGroups) {
        const el = document.getElementById(group.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveFilter(group.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageClick = (flatIdx: number, imageKey: string) => {
    // Check if device supports hover via media query
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      // Mobile tap behavior: toggle detail panel first
      if (activeDetailIdx === imageKey) {
        // Second tap opens lightbox
        setSelectedImage(flatIdx);
      } else {
        // First tap reveals details
        setActiveDetailIdx(imageKey);
      }
    } else {
      // Desktop: hover reveals, click opens lightbox immediately
      setSelectedImage(flatIdx);
    }
  };

  return (
    <section id="gallery" className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase"
          >
            MILESTONES & SHOWCASE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Key engineering milestones, national hackathon honors, AWS certifications, and developer community leadership.
          </motion.p>
        </div>

        {/* Sticky/Floating Filter Bar */}
        <div className="sticky top-20 z-30 w-full max-w-4xl px-4 py-2 mt-2 mb-6 flex items-center justify-center">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            {eventGroups.map((group) => {
              const isActive = activeFilter === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => handleScrollToSection(group.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-tag text-xs tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? "text-black bg-white shadow-sm font-semibold" 
                      : "text-zinc-400 hover:text-white bg-transparent hover:bg-white/5"
                  }`}
                >
                  {group.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Groups Sections */}
        <div className="w-full flex flex-col gap-20">
          {eventGroups.map((group, groupIdx) => {
            // Find global image index offset for this group
            let previousImagesCount = 0;
            for (let i = 0; i < groupIdx; i++) {
              previousImagesCount += eventGroups[i].images.length;
            }

            return (
              <div 
                key={group.id} 
                id={group.id} 
                className="scroll-mt-36 flex flex-col gap-6"
              >
                {/* Event Heading */}
                <div className="border-l-2 border-white/20 pl-4 space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase">
                    {group.title}
                  </h3>
                  <p className="font-body text-zinc-400 text-xs sm:text-sm">
                    {group.caption}
                  </p>
                </div>

                {/* Event Image Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {group.images.map((image, imgIdx) => {
                    const flatIdx = previousImagesCount + imgIdx;
                    const imageKey = `${group.id}-${imgIdx}`;
                    const isDetailActive = activeDetailIdx === imageKey;

                    return (
                      <motion.div
                        key={imageKey}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (imgIdx % 4) * 0.08 }}
                        onClick={() => handleImageClick(flatIdx, imageKey)}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 bg-zinc-950/20 shadow-md ${
                          isDetailActive ? "ring-2 ring-white/30" : ""
                        }`}
                      >
                        {/* Image or Video Frame */}
                        <div className="relative w-full h-full bg-zinc-900">
                          {image.type === "video" ? (
                            <>
                              <video
                                src={image.src}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                                onMouseLeave={(e) => {
                                  e.currentTarget.pause();
                                  e.currentTarget.currentTime = 0;
                                }}
                              />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10 text-white shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </>
                          ) : (
                            <Image
                              src={image.src}
                              alt={image.caption}
                              fill
                              sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              style={image.rotate ? { transform: `rotate(${image.rotate}deg) scale(1.35)` } : undefined}
                            />
                          )}
                        </div>

                        {/* Dim Overlay */}
                        <div 
                          className={`absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 ${
                            isDetailActive ? "bg-black/55" : ""
                          }`} 
                        />

                        {/* Slide-Up Detail Panel */}
                        <div 
                          className={`absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1 select-none pointer-events-none transform transition-all duration-300 ${
                            isDetailActive 
                              ? "translate-y-0 opacity-100" 
                              : "translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                          }`}
                        >
                           <span className="font-tag text-xs tracking-wider text-zinc-300 uppercase">
                            {group.shortName}
                          </span>
                          <p className="font-body text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">
                            {image.caption}
                          </p>
                          <div className="flex flex-col gap-0.5 mt-1 text-xs text-zinc-300">
                            <span className="flex items-center gap-1 font-mono-accent">
                              <Calendar size={10} className="text-zinc-400" />
                              {image.date}
                            </span>
                            <span className="flex items-center gap-1 font-body text-zinc-300">
                              <MapPin size={10} className="text-zinc-400" />
                              {image.location}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
          >
            {/* Top Navigation */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
              {/* Image Counter */}
              <span className="font-mono-accent text-sm text-zinc-400 bg-white/5 px-3 py-1 rounded border border-white/10">
                {selectedImage + 1} / {allImages.length}
              </span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prev Button */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Lightbox Content Container */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video sm:aspect-auto sm:h-[80vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/12"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages[selectedImage].type === "video" ? (
                <video
                  src={allImages[selectedImage].src}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain bg-zinc-950"
                />
              ) : (
                <Image
                  src={allImages[selectedImage].src}
                  alt={allImages[selectedImage].caption}
                  fill
                  className="object-contain"
                  style={allImages[selectedImage].rotate ? { transform: `rotate(${allImages[selectedImage].rotate}deg)` } : undefined}
                />
              )}
              
              {/* Dynamic Overlay Info inside Zoom Modal */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex flex-col gap-1 pointer-events-none max-w-lg hidden sm:flex">
                <span className="font-tag text-xs tracking-wider text-zinc-300 uppercase">
                  {allImages[selectedImage].location}
                </span>
                <p className="font-body text-sm font-semibold text-white leading-relaxed">
                  {allImages[selectedImage].caption}
                </p>
                <span className="font-mono-accent text-xs text-zinc-400 mt-0.5">
                  {allImages[selectedImage].date}
                </span>
              </div>
            </motion.div>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
