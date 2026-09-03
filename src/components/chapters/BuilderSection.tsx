"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { ConcurrencySimulator } from "./ConcurrencySimulator";
import { 
  Building2, 
  Layers, 
  ShieldAlert, 
  WifiOff, 
  Radio, 
  CalendarCheck, 
  Server, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

export function BuilderSection() {
  const [activeMission, setActiveMission] = useState<string>("mission-2");
  const exp = RESUME_DATA.experience;

  const missionIcons: Record<string, React.ElementType> = {
    "mission-1": Layers,
    "mission-2": ShieldAlert,
    "mission-3": WifiOff,
    "mission-4": Radio,
    "mission-5": CalendarCheck,
    "mission-6": Server,
  };

  return (
    <section id="chapter-builder" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500 tracking-tighter">
            02
          </span>
          <div className="h-7 w-[1px] bg-white/20" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
              THE BUILDER
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              PRODUCTION MISSIONS & CONCURRENCY ENGINEERING
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10">
          GROWW YOU // 06/2026 – 08/2026
        </span>
      </div>

      {/* Section Title & Intro */}
      <div className="max-w-4xl space-y-4 mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          Production Systems, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            Engineered For The Real World.
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          At Groww You, software engineering wasn&apos;t theoretical exercise. It meant solving critical concurrency bugs 
          on active vehicle trips, preventing offline data corruption in warehouse operations, and building multi-tenant 
          ERP systems with dual-format hardware printing.
        </p>
      </div>

      {/* Embedded Concurrency Interactive Lab */}
      <div className="mb-16">
        <ConcurrencySimulator />
      </div>

      {/* The 6 Engineering Missions Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            ENGINEERING MISSIONS DOSSIER
          </h3>
          <span className="text-xs font-mono text-gray-400">
            CLICK MISSION TO EXPAND CASE STUDY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exp.missions.map((mission) => {
            const Icon = missionIcons[mission.id] || Layers;
            const isSelected = activeMission === mission.id;

            return (
              <div
                key={mission.id}
                onClick={() => {
                  sound.playClick();
                  setActiveMission(mission.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`manga-panel rounded-xl p-6 cursor-pointer flex flex-col justify-between transition-all ${
                  isSelected
                    ? "bg-[#131826] border-amber-500/60 shadow-xl shadow-amber-500/10 scale-[1.01]"
                    : "bg-[#0b0e15] border-white/10 hover:border-white/25"
                }`}
              >
                <div className="space-y-4">
                  {/* Mission Badge & Platform */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                      MISSION {mission.missionNumber}
                    </span>
                    <span className="text-gray-400 text-[11px] truncate max-w-[180px]">
                      {mission.platform}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white tracking-tight flex items-start gap-2">
                    <Icon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{mission.title}</span>
                  </h4>

                  {/* Challenge & Solution */}
                  <div className="space-y-2 text-xs text-gray-300">
                    <div>
                      <span className="font-mono text-amber-400/90 font-semibold block text-[11px]">
                        CHALLENGE:
                      </span>
                      <p className="line-clamp-2 text-gray-400">{mission.challenge}</p>
                    </div>

                    <div>
                      <span className="font-mono text-cyan-400/90 font-semibold block text-[11px]">
                        ENGINEERED SOLUTION:
                      </span>
                      <p className="line-clamp-3 text-gray-300">{mission.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
