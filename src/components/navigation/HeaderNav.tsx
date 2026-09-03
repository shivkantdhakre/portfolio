"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { 
  Volume2, 
  VolumeX, 
  Briefcase, 
  Menu, 
  X
} from "lucide-react";

interface HeaderNavProps {
  onOpenRecruiter: () => void;
  activeChapter: string;
}

const CHAPTERS = [
  { id: "chapter-hero", number: "01", label: "ENGINEER" },
  { id: "chapter-builder", number: "02", label: "BUILDER" },
  { id: "chapter-architect", number: "03", label: "ARCHITECT" },
  { id: "chapter-human", number: "04", label: "HUMAN" },
  { id: "chapter-beyond", number: "05", label: "BEYOND" },
  { id: "chapter-faq", number: "FAQ", label: "FAQ" },
  { id: "chapter-contact", number: "06", label: "CONTACT" },
];

export function HeaderNav({ onOpenRecruiter, activeChapter }: HeaderNavProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global scroll listener for progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalScroll) * 100, 0), 100);
        setScrollProgress(Math.round(progress));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global 'R' key listener to trigger Recruiter Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or if modifier keys are pressed (e.g. Ctrl+R or Cmd+R)
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable ||
        e.ctrlKey || 
        e.metaKey || 
        e.altKey
      ) {
        return;
      }
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        sound.playClick();
        onOpenRecruiter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenRecruiter]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-300 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Nav Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#07080c]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Monogram */}
          <div
            onClick={() => scrollTo("chapter-hero")}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-mono font-extrabold text-black text-sm group-hover:scale-105 transition-transform">
              SK
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-white block">
                SHIV KANT DHAKRE
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                PORTFOLIO // 2026
              </span>
            </div>
          </div>

          {/* Desktop Chapter Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/40 border border-white/10 rounded-full px-3 py-1 font-mono text-xs">
            {CHAPTERS.map((ch) => {
              const isActive = activeChapter === ch.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => scrollTo(ch.id)}
                  onMouseEnter={() => sound.playHover()}
                  aria-label={`Jump to chapter ${ch.number}: ${ch.label}`}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="text-[10px] opacity-70">{ch.number}</span>
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Scroll Telemetry */}
            <div className="hidden sm:block text-[11px] font-mono text-gray-400 border border-white/10 px-2.5 py-1 rounded bg-black/30">
              <span className="text-amber-400">{scrollProgress}%</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => sound.playHover()}
              title={soundEnabled ? "Mute Cybernetic Audio" : "Enable Cybernetic Audio"}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Prominent [ ENTER RECRUITER MODE ] Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenRecruiter();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">RECRUITER MODE</span>
              <kbd className="hidden md:inline px-1 py-0.2 bg-black/40 border border-cyan-500/30 rounded text-[9px] text-cyan-300">
                R
              </kbd>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-1 font-mono text-xs">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                aria-label={`Jump to chapter ${ch.number}: ${ch.label}`}
                className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 text-gray-300 flex items-center gap-3"
              >
                <span className="text-amber-400 font-bold">{ch.number}</span>
                <span>{ch.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
