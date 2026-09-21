import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import IntroSequence from "@/components/IntroSequence";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <Navbar />
      
      <main className="flex min-h-screen flex-col items-center w-full">
        <Hero />
        <Experience />
        <AboutMe />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      
      {/* Floating Scroll-to-top & Wall of Thoughts Sticky Note Stack */}
      <FloatingWidgets />
    </>
  );
}
