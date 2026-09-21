import React from "react";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col items-center w-full bg-transparent">
      {/* Back to Home Nav */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-7xl px-4 py-3 rounded-[24px] bg-black/60 backdrop-blur-xl border border-white/12 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-tag text-sm tracking-wider">Back to Home</span>
        </Link>
        <span className="font-display text-lg font-bold tracking-wider text-white">
          ADITYA
        </span>
      </header>

      <main className="flex-1 w-full pt-28 pb-16 flex flex-col items-center">
        <Gallery />
      </main>

      <Footer />
    </div>
  );
}
