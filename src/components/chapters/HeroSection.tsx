"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { EcosystemMap } from "./EcosystemMap";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { 
  ChevronDown, 
  Terminal, 
  Code2, 
  Briefcase,
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
      <FadeIn direction="down" duration={0.6}>
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
                SYSTEM ARCHITECTURE &amp; PRODUCTION CODING
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>OPEN FOR HIGH-IMPACT ROLES</span>
          </div>
        </div>
      </FadeIn>

      {/* Hero Center Editorial Framing */}
      <div className="my-auto py-12 md:py-20 max-w-4xl space-y-6">
        <FadeIn delay={0.15} distance={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>FULL_STACK // AI_SYSTEMS // PRODUCTION_ENGINEER</span>
          </div>
        </FadeIn>

        <div className="space-y-3 relative">
          <span className="absolute -left-6 top-2 text-[10px] font-mono text-amber-500/40 select-none hidden md:inline">+</span>
          <span className="absolute -right-6 top-2 text-[10px] font-mono text-cyan-500/40 select-none hidden md:inline">+</span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white uppercase font-sans">
            <RevealText text="SHIV KANT" delay={0.2} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400">
              <RevealText text="DHAKRE" delay={0.35} />
            </span>
          </h1>

          <FadeIn delay={0.45} distance={18}>
            <p className="text-lg sm:text-2xl font-light text-gray-300 max-w-2xl leading-relaxed tracking-tight">
              FULL-STACK ENGINEER BUILDING PRODUCTION SYSTEMS, AI WORKFLOWS &amp; DIGITAL EXPERIENCES.
            </p>
          </FadeIn>
        </div>

        {/* Technical Domain Tags */}
        <StaggerGroup delay={0.55} staggerInterval={0.06} className="flex flex-wrap gap-2 pt-2">
          {["FULL STACK", "AI / ML & NLP", "SYSTEMS CONCURRENCY", "MOBILE ARCHITECTURE", "OFFLINE INTEGRITY"].map((tag) => (
            <StaggerItem key={tag}>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-[#111622] border border-white/10 text-gray-300 hover:border-amber-500/50 hover:text-white transition-all inline-block">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Action CTAs */}
        <FadeIn delay={0.7} distance={20} className="flex flex-wrap items-center gap-4 pt-6">
          <MagneticButton onClick={scrollToBuilder} strength={0.25}>
            <div className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-sm flex items-center gap-2 transition-all transform shadow-lg shadow-amber-500/20">
              <span>ENTER THE ENGINEER&apos;S JOURNEY</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </MagneticButton>

          <MagneticButton onClick={onOpenRecruiter} strength={0.22}>
            <div className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-sm flex items-center gap-2 transition-all hover:border-cyan-400/50">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>ENTER RECRUITER MODE [R]</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </div>
          </MagneticButton>
        </FadeIn>
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
