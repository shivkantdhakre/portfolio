"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { ConcurrencySimulator } from "./ConcurrencySimulator";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { 
  Layers, 
  ShieldAlert, 
  WifiOff, 
  Radio, 
  CalendarCheck, 
  Server, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export function BuilderSection() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>("mission-2");
  const exp = RESUME_DATA.experience;

  const missionIcons: Record<string, React.ElementType> = {
    "mission-1": Layers,
    "mission-2": ShieldAlert,
    "mission-3": WifiOff,
    "mission-4": Radio,
    "mission-5": CalendarCheck,
    "mission-6": Server,
  };

  const selectedMission = exp.missions.find((m) => m.id === selectedMissionId) || exp.missions[1];

  return (
    <section id="chapter-builder" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <ChapterTransition
        number="02"
        title="THE BUILDER"
        subtitle="PRODUCTION MISSIONS & CONCURRENCY SYSTEMS"
        badge="GROWW YOU // 06/2026 – 08/2026"
        badgeTone="lime"
      />

      {/* Section Title & Intro */}
      <div className="max-w-4xl space-y-4 mb-12">
        <ChapterHeading chapter="02" telemetry="MUTEX_LOCK // CONCURRENCY_HARDENED">
          PRODUCTION SYSTEMS, <br />
          <span className="text-lime-400">ENGINEERED FOR THE REAL WORLD.</span>
        </ChapterHeading>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          At Groww You, software engineering was not a theoretical classroom exercise. It meant solving critical concurrency race conditions 
          on active vehicle trips, preventing offline data corruption in warehouse operations, and architecting multi-tenant 
          ERP systems with dual-format hardware printing.
        </p>
      </div>

      {/* Embedded Concurrency & Offline Sync Diagnostic Lab */}
      <div className="mb-16">
        <ConcurrencySimulator />
      </div>

      {/* The 6 Engineering Missions Dossier */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
            ENGINEERING MISSIONS DOSSIER
          </h3>
          <span className="text-xs font-mono text-gray-400">
            SELECT MISSION TO INSPECT QUAD-STEP RESOLUTION
          </span>
        </div>

        {/* Mission Card Grid */}
        <StaggerGroup staggerInterval={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exp.missions.map((mission) => {
            const Icon = missionIcons[mission.id] || Layers;
            const isSelected = selectedMissionId === mission.id;

            return (
              <StaggerItem key={mission.id}>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedMissionId(mission.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left manga-panel rounded-xl p-5 cursor-pointer flex flex-col justify-between transition-all h-full focus-ring-lime ${
                    isSelected
                      ? "bg-[#141926] border-lime-500/60 shadow-xl shadow-lime-500/10 scale-[1.01]"
                      : "bg-[#0b0e15] border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="space-y-3 w-full">
                    {/* Mission Badge & Platform */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-lime-500/10 border border-lime-500/30 text-lime-400 font-bold">
                        MISSION {mission.missionNumber}
                      </span>
                      <span className="text-gray-400 text-[11px] truncate max-w-[150px]">
                        {mission.platform}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-lime-400" : "text-gray-400"}`} />
                      <span className="truncate">{mission.title}</span>
                    </h4>

                    {/* Challenge & Solution Preview */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-lime-400/90 font-semibold block text-[10px] uppercase">
                          CHALLENGE:
                        </span>
                        <p className="line-clamp-2 text-gray-400 font-sans leading-relaxed">
                          {mission.challenge}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-cyan-400/90 font-semibold block text-[10px] uppercase">
                          SOLUTION:
                        </span>
                        <p className="line-clamp-2 text-gray-300 font-sans leading-relaxed">
                          {mission.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 space-y-2.5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {mission.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="space-y-1">
                      {mission.metrics.slice(0, 2).map((metric) => (
                        <div
                          key={metric}
                          className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400"
                        >
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span className="truncate">{metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className={isSelected ? "text-lime-400 font-semibold" : "text-gray-500"}>
                        {isSelected ? "ACTIVE INSPECTION" : "CLICK TO EXPAND"}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-lime-400 translate-x-0.5" : "text-gray-600"}`} />
                    </div>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Selected Mission Detailed Dossier: Problem -> Decision -> Implementation -> Result */}
        <div className="bg-[#0e131d]/85 border border-lime-500/40 rounded-2xl p-6 md:p-8 space-y-6 mt-8 panel-anchor shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-lime-400 tracking-wider">
                DEEP DIVE // MISSION {selectedMission.missionNumber}
              </span>
              <h4 className="text-2xl font-bold text-white">
                {selectedMission.title}
              </h4>
              <span className="text-xs font-mono text-gray-400 block">
                PLATFORM: {selectedMission.platform}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedMission.tags.map((t) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quad-Step Technical Architecture: Problem -> Engineering Decision -> Implementation -> Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Step 1: Problem */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                01 / THE PRODUCTION CHALLENGE
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">
                {selectedMission.challenge}
              </p>
            </div>

            {/* Step 2: Engineering Decision */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                02 / ARCHITECTURAL DECISION
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">
                Root-caused failure boundary, identified race condition / schema bottlenecks, and selected optimal fault-tolerant design pattern.
              </p>
            </div>

            {/* Step 3: Implementation */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-lime-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                03 / ENGINEERED IMPLEMENTATION
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">
                {selectedMission.solution}
              </p>
            </div>

            {/* Step 4: Result / Verified Responsibility */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                04 / PRODUCTION OUTCOME &amp; IMPACT
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">
                {selectedMission.impact}
              </p>
            </div>
          </div>

          {/* Verified Metrics Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="text-gray-500">VERIFIED ENGINEERING METRICS:</span>
            <div className="flex flex-wrap gap-3">
              {selectedMission.metrics.map((metric) => (
                <div key={metric} className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
