"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sound } from "@/lib/sound";
import { EASING } from "./motionTokens";
export { ChapterHeading } from "./ChapterHeading";

export type ChapterTone = "emerald" | "amber" | "lime" | "cyan" | "rose" | "purple" | "blue" | "orange";

export interface ChapterTransitionProps {
  number: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeTone?: ChapterTone;
  className?: string;
}

const DEFAULT_TONES: Record<string, ChapterTone> = {
  "01": "emerald",
  "02": "lime",
  "03": "cyan",
  "04": "rose",
  "05": "purple",
  "06": "blue",
  "07": "orange",
};

export function ChapterTransition({
  number,
  title,
  subtitle,
  badge,
  badgeTone,
  className = "",
}: ChapterTransitionProps) {
  const shouldReduce = useReducedMotion();

  // Automatically map number to unique chapter color if not explicitly provided
  const resolvedTone: ChapterTone = badgeTone || DEFAULT_TONES[number] || "lime";

  // 7 Unique Pill Badge Color Schemes for the 7 Chapters
  const toneClasses: Record<ChapterTone, string> = {
    emerald: "text-emerald-400 bg-emerald-950/40 border-emerald-500/35 hover:border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    amber: "text-amber-400 bg-amber-950/40 border-amber-500/35 hover:border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    lime: "text-lime-400 bg-lime-950/40 border-lime-500/35 hover:border-lime-400/60 shadow-[0_0_12px_rgba(163,230,53,0.15)]",
    cyan: "text-cyan-400 bg-cyan-950/40 border-cyan-500/35 hover:border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
    rose: "text-rose-400 bg-rose-950/40 border-rose-500/35 hover:border-rose-400/60 shadow-[0_0_12px_rgba(244,63,94,0.15)]",
    purple: "text-purple-400 bg-purple-950/40 border-purple-500/35 hover:border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
    blue: "text-blue-400 bg-blue-950/40 border-blue-500/35 hover:border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
    orange: "text-orange-400 bg-orange-950/40 border-orange-500/35 hover:border-orange-400/60 shadow-[0_0_12px_rgba(249,115,22,0.15)]",
  };

  const numberColorClasses: Record<ChapterTone, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    lime: "text-lime-400",
    cyan: "text-cyan-400",
    rose: "text-rose-400",
    purple: "text-purple-400",
    blue: "text-blue-400",
    orange: "text-orange-400",
  };

  const pingColorClasses: Record<ChapterTone, string> = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    lime: "bg-lime-400",
    cyan: "bg-cyan-400",
    rose: "bg-rose-400",
    purple: "bg-purple-400",
    blue: "bg-blue-400",
    orange: "bg-orange-400",
  };

  const coreDotClasses: Record<ChapterTone, string> = {
    emerald: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.95)]",
    amber: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.95)]",
    lime: "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.95)]",
    cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.95)]",
    rose: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.95)]",
    purple: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.95)]",
    blue: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.95)]",
    orange: "bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.95)]",
  };

  // 7 Bespoke Pill Badge Entrance Transitions for the 7 Chapters
  const getBadgeVariants = (chNum: string): {
    initial: Record<string, any>;
    animate: Record<string, any>;
    transition: any;
  } => {
    if (shouldReduce) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }

    switch (chNum) {
      case "01": // Precision Monolith Drop (Spring elevation downward with micro-overshoot)
        return {
          initial: { opacity: 0, y: -18, scale: 0.92 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { type: "spring" as const, stiffness: 350, damping: 24, delay: 0.18 },
        };
      case "02": // Mechanical Plate Slide-In (High-friction lateral snap for concurrency mutex)
        return {
          initial: { opacity: 0, x: 34, scale: 0.94 },
          animate: { opacity: 1, x: 0, scale: 1 },
          transition: { type: "spring" as const, stiffness: 280, damping: 20, delay: 0.16 },
        };
      case "03": // Blueprint Vector Line-to-Pill Unfold (CAD schematic expansion)
        return {
          initial: { opacity: 0, scaleX: 0.2, scaleY: 0.9 },
          animate: { opacity: 1, scaleX: 1, scaleY: 1 },
          transition: { duration: 0.55, ease: EASING.cinematic, delay: 0.18 },
        };
      case "04": // Constellation Organic Radial Bloom (Heartbeat & soft blur dissipate)
        return {
          initial: { opacity: 0, scale: 0.72, filter: "blur(4px)" },
          animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
          transition: { duration: 0.6, ease: [0.34, 1.4, 0.64, 1], delay: 0.18 },
        };
      case "05": // Manga Kinetic Slash (Dynamic diagonal punch & tracking snap)
        return {
          initial: { opacity: 0, x: 26, y: -10, rotate: -3 },
          animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
          transition: { type: "spring" as const, stiffness: 380, damping: 22, delay: 0.15 },
        };
      case "06": // Terminal Query Bracket Pop (Monospace status code reveal with cursor blink)
        return {
          initial: { opacity: 0, y: 10, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.45, ease: EASING.editorial, delay: 0.18 },
        };
      case "07": // Dispatch Beacon Flare Ignition (Luminance burst settling into stable glow)
        return {
          initial: { opacity: 0, scale: 0.88, filter: "brightness(1.5)" },
          animate: { opacity: 1, scale: 1, filter: "brightness(1)" },
          transition: { duration: 0.55, ease: EASING.cinematic, delay: 0.2 },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4, delay: 0.2 },
        };
    }
  };

  const badgeMotion = getBadgeVariants(number);

  return (
    <div className={`flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-12 gap-4 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Chapter Number with 7 Unique Thematic Colors */}
        <motion.span
          initial={{ opacity: 0, x: shouldReduce ? 0 : -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASING.cinematic }}
          className={`text-3xl sm:text-4xl font-mono font-extrabold tracking-tighter ${numberColorClasses[resolvedTone]}`}
        >
          {number}
        </motion.span>
        <div className="h-7 w-[1px] bg-white/20" />
        <div className="space-y-0.5">
          <motion.span
            initial={{ opacity: 0, y: shouldReduce ? 0 : 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-xs font-mono font-bold tracking-widest text-white uppercase block"
          >
            {title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-[10px] font-mono text-gray-400 tracking-wider block"
          >
            {subtitle}
          </motion.span>
        </div>
      </div>

      {/* Pill Badge with 7 Chapter Colors + Restored Live Radar/Sonar Micro-Animation */}
      {badge && (
        <motion.div
          initial={badgeMotion.initial}
          whileInView={badgeMotion.animate}
          viewport={{ once: true }}
          transition={badgeMotion.transition}
          whileHover={{ scale: shouldReduce ? 1 : 1.05 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => sound.playHover()}
          className={`text-xs font-mono px-3.5 py-1 rounded-full border inline-flex items-center gap-2.5 tracking-wide transition-colors cursor-pointer select-none group ${toneClasses[resolvedTone]}`}
        >
          {/* Live Radar/Sonar Beacon Micro-Animation Dot in Chapter Color */}
          <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
            {/* Primary Expanding Ping Wave */}
            <span
              className={`animate-radar-ping absolute inline-flex h-full w-full rounded-full ${pingColorClasses[resolvedTone]}`}
            />
            {/* Secondary Delayed Ping Wave for Rich Radar Sweep */}
            <span
              className={`animate-radar-ping-secondary absolute inline-flex h-full w-full rounded-full ${pingColorClasses[resolvedTone]}`}
            />
            {/* Luminous Solid Core Dot */}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${coreDotClasses[resolvedTone]}`}
            />
          </span>

          {/* Chapter-Themed Badge Text */}
          <span className="font-semibold">{badge}</span>

          {/* Micro-detail for Terminal / AEO Chapter */}
          {number === "06" && (
            <span className="w-1 h-3 bg-blue-400 animate-pulse hidden sm:inline-block ml-0.5" />
          )}
        </motion.div>
      )}
    </div>
  );
}
