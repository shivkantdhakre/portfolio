"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCoreScene } from "@/components/3d/HeroCoreScene";
import { HeaderNav } from "@/components/navigation/HeaderNav";
import { HeroSection } from "@/components/chapters/HeroSection";
import { BuilderSection } from "@/components/chapters/BuilderSection";
import { ArchitectSection } from "@/components/chapters/ArchitectSection";
import { HumanSection } from "@/components/chapters/HumanSection";
import { BeyondCodeSection } from "@/components/chapters/BeyondCodeSection";
import { FaqSection } from "@/components/chapters/FaqSection";
import { ContactSection } from "@/components/chapters/ContactSection";
import { RecruiterModeModal } from "@/components/recruiter/RecruiterModeModal";
import { PageLoadIntro } from "@/components/motion/PageLoadIntro";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>("chapter-hero");
  const lenisRef = useRef<Lenis | null>(null);

  // Synchronize Lenis Smooth Scroll with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause smooth scroll when Recruiter Modal is open to restore native wheel scroll
  useEffect(() => {
    if (recruiterOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [recruiterOpen]);

  // Chapter Tracking with ScrollTrigger and Focal Scanning
  useEffect(() => {
    const chapterIds = [
      "chapter-hero",
      "chapter-builder",
      "chapter-architect",
      "chapter-human",
      "chapter-beyond",
      "chapter-faq",
      "chapter-contact",
    ];

    let ticking = false;

    const updateActiveChapter = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      // When near page bottom, activate Contact
      if (totalScroll > 0 && scrollY >= totalScroll - 120) {
        setActiveChapter("chapter-contact");
        ticking = false;
        return;
      }

      // 35% scanline down from top of viewport
      const focalLine = window.innerHeight * 0.35;
      let matchedChapter = chapterIds[0];

      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const id = chapterIds[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine) {
          matchedChapter = id;
          break;
        }
      }

      setActiveChapter(matchedChapter);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveChapter);
        ticking = true;
      }
    };

    updateActiveChapter();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Rapid Non-blocking Cinematic Entrance */}
      <PageLoadIntro />

      {/* Atmospheric Blueprint Grid & Speed Lines */}
      <div className="fixed inset-0 blueprint-grid opacity-50 pointer-events-none z-0" />
      <div className="fixed inset-0 speed-lines opacity-30 pointer-events-none z-0" />

      {/* Persistent 3D Architectural Monolith WebGL Scene */}
      <HeroCoreScene activeChapter={activeChapter} />

      {/* Top Header Navigation */}
      <HeaderNav
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        onOpenRecruiter={() => setRecruiterOpen(true)}
      />

      {/* Main Narrative Chapters */}
      <main className="relative z-10 space-y-16">
        {/* Chapter 01: THE ENGINEER */}
        <HeroSection onOpenRecruiter={() => setRecruiterOpen(true)} />

        {/* Chapter 02: THE BUILDER */}
        <BuilderSection />

        {/* Chapter 03: THE ARCHITECT & LABS */}
        <ArchitectSection />

        {/* Chapter 04: THE HUMAN */}
        <HumanSection />

        {/* Chapter 05: BEYOND CODE */}
        <BeyondCodeSection />

        {/* Knowledge Base & AEO FAQ */}
        <FaqSection />

        {/* Chapter 06: LET'S BUILD */}
        <ContactSection onOpenRecruiter={() => setRecruiterOpen(true)} />
      </main>

      {/* Clean Technical Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 text-center text-xs font-mono text-gray-500 bg-[#07090e]/90">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span>SHIV KANT DHAKRE © 2026 // FULL-STACK ENGINEER</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">NEXT.js • THREE.js • GSAP • TAILWIND</span>
            <button
              onClick={() => setRecruiterOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold focus-ring-amber rounded px-1.5 py-0.5"
            >
              [ RECRUITER MODE ]
            </button>
          </div>
        </div>
      </footer>

      {/* Dedicated 60-Second Recruiter Mode Modal */}
      <RecruiterModeModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />
    </div>
  );
}
