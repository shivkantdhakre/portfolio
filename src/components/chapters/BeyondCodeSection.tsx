"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { 
  Sparkles, 
  Trophy, 
  Award, 
  Target, 
  BookOpen, 
  Binary,
  CheckCircle2
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
      <ChapterTransition
        number="05"
        title="BEYOND CODE & MILESTONES"
        subtitle="PHILOSOPHY, MANGA EDITORIAL PANELS & VERIFIED AWARDS"
        badge="CREATIVE TECHNOLOGIST"
        badgeTone="purple"
      />

      {/* Section Title & Philosophy Intro */}
      <div className="max-w-4xl space-y-4 mb-12">
        <ChapterHeading chapter="05" telemetry="MANGA_KINETIC // EDITORIAL_NARRATIVE">
          When I&apos;m Not Building Systems... <br />
          <span className="text-purple-400">Stories, Discipline &amp; Milestones.</span>
        </ChapterHeading>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          Engineering is not merely functional logic; it is world-building. 
          Immersion in manga, manhwa, and narrative architecture shapes how I approach complex software systems: 
          each component is a character, every edge case a plot twist, and high availability the triumphant resolution.
        </p>
      </div>

      {/* Manga Editorial Sequence Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Panel 1 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-5 flex flex-col justify-between group hover:border-purple-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span className="font-bold tracking-wider">PANEL 01 // PERSPECTIVE</span>
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

          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-purple-300/90 leading-snug">
            &ldquo;{philosophy.principles[0].title}&rdquo;
          </div>
        </div>

        {/* Panel 2 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-5 flex flex-col justify-between group hover:border-purple-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span className="font-bold tracking-wider">PANEL 02 // PHILOSOPHY</span>
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

          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-purple-300/90 leading-snug">
            &ldquo;{philosophy.principles[1].title}&rdquo;
          </div>
        </div>

        {/* Panel 3 */}
        <div className="manga-panel rounded-xl p-6 bg-[#0b0e17] border border-white/15 space-y-5 flex flex-col justify-between group hover:border-purple-500/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span className="font-bold tracking-wider">PANEL 03 // CRAFT</span>
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

          <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-amber-300/90 leading-snug">
            &ldquo;{philosophy.principles[2].title}&rdquo;
          </div>
        </div>
      </div>

      {/* Verified Milestones & Achievements Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-bold">
              EVALUATION // MILESTONES &amp; HONORS
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Verified Technical Achievements
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10">
            100% FACTUAL RESUME VERIFIED
          </span>
        </div>

        <StaggerGroup staggerInterval={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => {
            const Icon = achievementIcons[ach.id] || Trophy;

            return (
              <StaggerItem key={ach.id}>
                <div
                  onMouseEnter={() => sound.playHover()}
                  className="manga-panel rounded-xl p-6 bg-[#0c1018] border border-white/10 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                        {ach.rankOrBadge}
                      </span>
                      <span className="text-gray-400 text-[11px]">{ach.date}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight flex items-start gap-2.5">
                      <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{ach.title}</span>
                    </h4>

                    <div className="text-xs text-gray-400 font-mono pl-8">{ach.organization}</div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1 pl-8">
                      {ach.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span className="text-gray-400 font-mono">#{ach.tag}</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      VERIFIED
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

