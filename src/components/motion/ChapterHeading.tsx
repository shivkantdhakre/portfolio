"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "./motionTokens";

export interface ChapterHeadingProps {
  chapter: "01" | "02" | "03" | "04" | "05" | "06" | "07";
  children: React.ReactNode;
  className?: string;
  telemetry?: string;
}

export function ChapterHeading({
  chapter,
  children,
  className = "",
  telemetry,
}: ChapterHeadingProps) {
  const shouldReduce = useReducedMotion();

  // 1. Chapter 01: Emerald Precision Monolith Elevation & Laser Baseline Expansion
  if (chapter === "01") {
    return (
      <div className="relative group">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/90 mb-2 tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span>{telemetry}</span>
          </motion.div>
        )}
        <div className="overflow-hidden pb-1">
          <motion.h2
            initial={{ opacity: 0, y: shouldReduce ? 0 : 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASING.powerOut }}
            className={`text-chapter-display text-white uppercase ${className}`}
          >
            {children}
          </motion.h2>
        </div>
        {/* Expanding Emerald Architectural Laser Baseline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING.cinematic, delay: 0.25 }}
          className="h-[1px] w-full max-w-sm bg-gradient-to-r from-emerald-500/70 via-emerald-400/30 to-transparent origin-left mt-2"
        />
      </div>
    );
  }

  // 2. Chapter 02: Electric Volt Lime Concurrency Mutex Split Interlock
  if (chapter === "02") {
    return (
      <div className="relative group">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[11px] font-mono text-lime-400/90 mb-2 tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-lime-400 rotate-45 shadow-[0_0_6px_rgba(163,230,53,0.8)]" />
            <span>{telemetry}</span>
          </motion.div>
        )}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: shouldReduce ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 22, delay: 0.05 }}
            className={`text-chapter-display text-white uppercase ${className}`}
          >
            {children}
          </motion.h2>
          {/* Lime Mutex lock synchronization flash indicator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASING.snappy }}
            className="absolute -inset-x-2 -inset-y-1 bg-lime-500/10 pointer-events-none rounded origin-left"
          />
        </div>
      </div>
    );
  }

  // 3. Chapter 03: Electric Cyan CAD Blueprint Laser Vector Scan
  if (chapter === "03") {
    return (
      <div className="relative group overflow-hidden">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/90 mb-2 tracking-widest font-semibold"
          >
            <span className="text-cyan-400 font-bold">[CAD_VECTOR]</span>
            <span>{telemetry}</span>
          </motion.div>
        )}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASING.cinematic }}
            className={`text-chapter-display text-white uppercase ${className}`}
          >
            {children}
          </motion.h2>
          {/* Electric Cyan Laser beam sweep bar */}
          {!shouldReduce && (
            <motion.div
              initial={{ x: "-100%", opacity: 1 }}
              whileInView={{ x: "200%", opacity: [1, 0.8, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASING.cinematic, delay: 0.1 }}
              className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"
            />
          )}
        </div>
      </div>
    );
  }

  // 4. Chapter 04: Warm Rose Constellation Syllabic Bloom
  if (chapter === "04") {
    return (
      <div className="relative group">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] font-mono text-rose-400/90 mb-2 tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
            <span>{telemetry}</span>
          </motion.div>
        )}
        <motion.h2
          initial={{
            opacity: 0,
            y: shouldReduce ? 0 : 26,
            filter: shouldReduce ? "none" : "blur(4px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.8, 0.25, 1] }}
          className={`text-chapter-display text-white uppercase ${className}`}
        >
          {children}
        </motion.h2>
      </div>
    );
  }

  // 5. Chapter 05: Royal Violet Manga Kinetic Panel Impact
  if (chapter === "05") {
    return (
      <div className="relative group">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0, rotate: -2 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[11px] font-mono text-purple-400/95 mb-2 tracking-widest font-bold"
          >
            <span>⚡ {telemetry}</span>
          </motion.div>
        )}
        <motion.h2
          initial={{
            opacity: 0,
            scale: shouldReduce ? 1 : 1.07,
            y: shouldReduce ? 0 : 14,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 22, delay: 0.05 }}
          className={`text-chapter-display text-white uppercase ${className}`}
        >
          {children}
        </motion.h2>
      </div>
    );
  }

  // 6. Chapter 06: Sapphire Blue Terminal Query Stream Decryption
  if (chapter === "06") {
    return (
      <div className="relative group">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-[11px] font-mono text-blue-400/90 mb-2 tracking-widest font-semibold"
        >
          <span className="text-blue-400 font-bold">&gt;&gt; AEO_QUERY //</span>
          <span>{telemetry || "GROUNDED_ENGINEERING_FACTS"}</span>
          <span className="w-1.5 h-3 bg-blue-400 animate-pulse ml-1" />
        </motion.div>
        <motion.h2
          initial={{
            opacity: 0,
            y: shouldReduce ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASING.editorial }}
          className={`text-chapter-display text-white uppercase tracking-tight ${className}`}
        >
          {children}
        </motion.h2>
      </div>
    );
  }

  // 7. Chapter 07: Solar Orange Atmospheric Beacon Uplink
  if (chapter === "07") {
    return (
      <div className="relative group">
        {telemetry && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] font-mono text-orange-400/95 mb-2 tracking-widest font-semibold"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-orange-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
            </span>
            <span>{telemetry}</span>
          </motion.div>
        )}
        <div className="relative">
          <motion.h2
            initial={{
              opacity: 0,
              y: shouldReduce ? 0 : 30,
              filter: shouldReduce ? "none" : "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASING.cinematic }}
            className={`text-chapter-display text-white uppercase ${className}`}
          >
            {children}
          </motion.h2>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <motion.h2
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`text-chapter-display text-white uppercase ${className}`}
    >
      {children}
    </motion.h2>
  );
}
