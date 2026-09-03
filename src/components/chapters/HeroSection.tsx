"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { EcosystemMap } from "./EcosystemMap";
import { 
  ChevronDown, 
  Terminal, 
  Sparkles, 
  Code2, 
  Briefcase,
  Layers,
  ArrowUpRight
} from "lucide-react";

interface HeroSectionProps {
  onOpenRecruiter: () => void;
}

export function HeroSection({ onOpenRecruiter }: HeroSectionProps) {
  const scrollToBuilder = () => {
    sound.playClick();
    const builderSec = document.getElementById("chapter-builder");
    if (builderSec) {
      builderSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="chapter-hero" className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Editorial Chapter Tag */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500 tracking-tighter">
            01
          </span>
          <div className="h-7 w-[1px] bg-white/20" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
              THE ENGINEER
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              SYSTEM ARCHITECTURE & PRODUCTION CODING
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>OPEN FOR HIGH-IMPACT ROLES</span>
        </div>
      </div>

      {/* Hero Center Editorial Framing */}
      <div className="my-auto py-12 md:py-20 max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>FULL_STACK // AI_SYSTEMS // PRODUCTION_ENGINEER</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white uppercase font-sans">
            SHIV KANT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400">
              DHAKRE
            </span>
          </h1>

          <p className="text-lg sm:text-2xl font-light text-gray-300 max-w-2xl leading-relaxed tracking-tight">
            FULL-STACK ENGINEER BUILDING PRODUCTION SYSTEMS, AI WORKFLOWS &amp; DIGITAL EXPERIENCES.
          </p>
        </div>

        {/* Technical Domain Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["FULL STACK", "AI / ML & NLP", "SYSTEMS CONCURRENCY", "MOBILE ARCHITECTURE", "OFFLINE INTEGRITY"].map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono font-semibold px-3 py-1 rounded bg-[#111622] border border-white/10 text-gray-300 hover:border-amber-500/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-6">
          <button
            onClick={scrollToBuilder}
            onMouseEnter={() => sound.playHover()}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>ENTER THE ENGINEER&apos;S JOURNEY</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenRecruiter();
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-sm flex items-center gap-2 transition-all hover:border-cyan-400/50 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>ENTER RECRUITER MODE [R]</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>

      {/* Section Transition: "I BUILD SYSTEMS, NOT JUST SCREENS." */}
      <div className="pt-20 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>ENGINEERING PHILOSOPHY // CHAPTER 01</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
          &ldquo;I BUILD SYSTEMS, <br className="hidden sm:inline" />
          <span className="text-amber-400">NOT JUST SCREENS.&rdquo;</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-400 max-w-3xl leading-relaxed font-sans">
          A high-performance digital experience is not merely visual aesthetics. It is a resilient, 
          concurrency-tested distributed architecture. From eliminating token-refresh race conditions in live ride-hailing apps 
          to guaranteeing offline data integrity and asynchronous AI task pipelines, explore how each subsystem connects below.
        </p>

        {/* Connected Ecosystem Map */}
        <EcosystemMap />
      </div>
    </section>
  );
}
