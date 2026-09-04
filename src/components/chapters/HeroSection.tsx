"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { EcosystemMap } from "./EcosystemMap";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
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
      {/* Editorial Chapter Header */}
      <ChapterTransition
        number="01"
        title="THE ENGINEER"
        subtitle="SYSTEM ARCHITECTURE & PRODUCTION CODING"
        badge="OPEN FOR HIGH-IMPACT ROLES"
        badgeTone="emerald"
      />

      {/* Hero Center Editorial Framing */}
      <div className="my-auto py-8 md:py-16 max-w-3xl space-y-6">
        <div className="space-y-4 relative">
          <h1 className="text-hero-display text-white uppercase tracking-tighter">
            <RevealText text="SHIV KANT" delay={0.15} />
            <br />
            <RevealText
              text="DHAKRE"
              delay={0.28}
              wordClassName="text-amber-400"
            />
          </h1>

          <FadeIn delay={0.38} distance={14}>
            <p className="text-lg sm:text-2xl font-light text-gray-300 max-w-2xl leading-relaxed tracking-tight">
              Full-stack engineer building production systems, concurrency-hardened backends &amp; AI workflows.
            </p>
          </FadeIn>
        </div>

        {/* Technical Domain Tags */}
        <StaggerGroup delay={0.45} staggerInterval={0.05} className="flex flex-wrap gap-2 pt-2">
          {["FULL STACK", "AI / ML & NLP", "CONCURRENCY MUTEX", "MOBILE ARCHITECTURE", "OFFLINE INTEGRITY"].map((tag) => (
            <StaggerItem key={tag}>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-[#0e121a] border border-white/10 text-gray-300 hover:border-amber-500/50 hover:text-white transition-all inline-block">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Action CTAs */}
        <FadeIn delay={0.55} distance={16} className="flex flex-wrap items-center gap-4 pt-4">
          <MagneticButton onClick={scrollToBuilder} strength={0.22}>
            <div className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-amber-500/15 cursor-pointer">
              <span>EXPLORE THE ENGINEERING JOURNEY</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </MagneticButton>

          <MagneticButton onClick={onOpenRecruiter} strength={0.2}>
            <div className="px-6 py-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/35 text-cyan-300 font-mono text-sm flex items-center gap-2 transition-all hover:border-cyan-400/60 cursor-pointer shadow-md shadow-cyan-500/10">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>RECRUITER MODE [R]</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 text-cyan-300" />
            </div>
          </MagneticButton>
        </FadeIn>
      </div>

      {/* Engineering Philosophy & Connected Technical Ecosystem */}
      <div className="pt-16 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>TECHNICAL THESIS // CHAPTER 01</span>
        </div>

        <ChapterHeading chapter="01" telemetry="SYSTEM_THESIS // CHAPTER_01">
          &ldquo;I BUILD SYSTEMS, <br className="hidden sm:inline" />
          <span className="text-emerald-400">NOT JUST SCREENS.&rdquo;</span>
        </ChapterHeading>

        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed font-sans">
          A resilient digital experience is not merely visual aesthetics. It is a concurrency-tested distributed architecture. 
          From eliminating token-refresh race conditions in live ride-hailing apps to guaranteeing offline data integrity and 
          asynchronous AI task processing, explore how each subsystem connects below.
        </p>

        {/* Connected Ecosystem Map with explicit What It Is + Where It Fits + How Shiv Kant Used It */}
        <EcosystemMap />
      </div>
    </section>
  );
}
