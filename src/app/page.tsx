"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { HeroCoreScene } from "@/components/3d/HeroCoreScene";
import { HeaderNav } from "@/components/navigation/HeaderNav";
import { HeroSection } from "@/components/chapters/HeroSection";
import { BuilderSection } from "@/components/chapters/BuilderSection";
import { ArchitectSection } from "@/components/chapters/ArchitectSection";
import { HumanSection } from "@/components/chapters/HumanSection";
import { BeyondCodeSection } from "@/components/chapters/BeyondCodeSection";
import { ContactSection } from "@/components/chapters/ContactSection";
import { RecruiterModeModal } from "@/components/recruiter/RecruiterModeModal";

export default function Home() {
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>("chapter-hero");
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Only run smooth scroll if user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis smooth scrolling when modal is open to restore native wheel scroll inside modal
  useEffect(() => {
    if (recruiterOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [recruiterOpen]);

  // Intersection Observer to detect active chapter on scroll
  useEffect(() => {
    const chapterIds = [
      "chapter-hero",
      "chapter-builder",
      "chapter-architect",
      "chapter-human",
      "chapter-beyond",
      "chapter-contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    chapterIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080c] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Blueprint Grid & Speed Lines Ambient Overlay */}
      <div className="fixed inset-0 blueprint-grid opacity-60 pointer-events-none z-0" />
      <div className="fixed inset-0 speed-lines opacity-40 pointer-events-none z-0" />

      {/* Persistent 3D Interactive WebGL Scene */}
      <HeroCoreScene />

      {/* Top Header Navigation */}
      <HeaderNav
        activeChapter={activeChapter}
        onOpenRecruiter={() => setRecruiterOpen(true)}
      />

      {/* Main Narrative Chapters */}
      <main className="relative z-10 space-y-12">
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

        {/* Chapter 06: LET'S BUILD */}
        <ContactSection onOpenRecruiter={() => setRecruiterOpen(true)} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 text-center text-xs font-mono text-gray-500 bg-[#07080c]/90">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span>SHIV KANT DHAKRE © 2026 // FULL-STACK ENGINEER</span>
          <div className="flex items-center gap-4">
            <span>BUILT WITH NEXT.JS, THREE.JS &amp; TAILWIND CSS</span>
            <button
              onClick={() => setRecruiterOpen(true)}
              className="text-amber-400 hover:underline cursor-pointer"
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
