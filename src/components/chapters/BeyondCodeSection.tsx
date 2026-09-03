"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { 
  Sparkles, 
  Trophy, 
  Award, 
  Target, 
  BookOpen, 
  Binary
} from "lucide-react";

export function BeyondCodeSection() {
  const achievements = RESUME_DATA.achievements;
  const philosophy = RESUME_DATA.philosophy;

  const achievementIcons: Record<string, React.ElementType> = {
    "ach-1": Trophy,
    "ach-2": Award,
    "ach-3": Target,
    "ach-4": Binary,
  };

  return (
    <section id="chapter-beyond" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500 tracking-tighter">
            05
          </span>
          <div className="h-7 w-[1px] bg-white/20" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
              BEYOND CODE &amp; MILESTONES
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              PHILOSOPHY, MANGA EDITORIAL PANELS &amp; VERIFIED AWARDS
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20">
          CREATIVE TECHNOLOGIST
        </span>
      </div>

      {/* Section Title */}
      <div className="max-w-4xl space-y-4 mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
          When I&apos;m Not Building Systems... <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">
            Stories, Discipline &amp; Milestones.
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          Engineering is not merely functional logic; it is world-building. 
          Immersion in manga, manhwa, and narrative architecture shapes how I approach complex software systems: 
          each component is a character, every edge case a plot twist, and high availability the triumphant resolution.
        </p>
      </div>

      {/* Manga Editorial Sequence Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Panel 1 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-4 flex flex-col justify-between group hover:border-amber-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
              <span>PANEL 01 // PERSPECTIVE</span>
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              World-Building in Software
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Manga narrative pacing teaches you how complex worlds stay coherent through rules. 
              Translating that into system architecture means designing state machines and distributed 
              services that remain resilient no matter how chaotic user load gets.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-amber-300">
            &ldquo;{philosophy.principles[0].title}&rdquo;
          </div>
        </div>

        {/* Panel 2 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-4 flex flex-col justify-between group hover:border-cyan-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>PANEL 02 // PHILOSOPHY</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              The Architecture Metaphor
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              &ldquo;{philosophy.quote}&rdquo;
              <br /><br />
              Standing before massive codebases is like standing before an intricate architectural sketch. 
              The beauty lies in the hidden joints — the mutex locks, the idempotent retries, and the atomic transactions.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-cyan-300">
            &ldquo;{philosophy.principles[1].title}&rdquo;
          </div>
        </div>

        {/* Panel 3 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-4 flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>PANEL 03 // CRAFT</span>
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Discipline &amp; Algorithmic Speed
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              From competitive coding in C++ to solving token-refresh race conditions under tight delivery schedules, 
              the discipline to trace problems to their root causes is what sets true engineers apart.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-emerald-300">
            &ldquo;{philosophy.principles[2].title}&rdquo;
          </div>
        </div>
      </div>

      {/* Verified Milestones & Achievements Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
              EVALUATION // MILESTONES &amp; HONORS
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Verified Technical Achievements
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">100% FACTUAL RESUME VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => {
            const Icon = achievementIcons[ach.id] || Trophy;

            return (
              <div
                key={ach.id}
                onMouseEnter={() => sound.playHover()}
                className="manga-panel rounded-xl p-6 bg-[#0c1018] border border-white/10 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                      {ach.rankOrBadge}
                    </span>
                    <span className="text-gray-400 text-[11px]">{ach.date}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white tracking-tight flex items-start gap-2">
                    <Icon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{ach.title}</span>
                  </h4>

                  <div className="text-xs text-gray-400 font-mono">{ach.organization}</div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span className="text-gray-400">{ach.tag}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
