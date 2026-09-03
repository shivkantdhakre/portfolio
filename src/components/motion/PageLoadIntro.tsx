"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { sound } from "@/lib/sound";
import { EASING } from "./motionTokens";

interface PageLoadIntroProps {
  onComplete?: () => void;
}

export function PageLoadIntro({ onComplete }: PageLoadIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"loading" | "complete" | "exit">(
    shouldReduceMotion ? "complete" : "loading"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      if (onComplete) onComplete();
      return;
    }

    // Telemetry progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 60);

    const timerComplete = setTimeout(() => {
      setProgress(100);
      setStage("exit");
      sound.playSuccess();
    }, 650);

    const timerExit = setTimeout(() => {
      setStage("complete");
      if (onComplete) onComplete();
    }, 1100);

    return () => {
      clearInterval(interval);
      clearTimeout(timerComplete);
      clearTimeout(timerExit);
    };
  }, [shouldReduceMotion, onComplete]);

  if (stage === "complete" || shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between overflow-hidden">
        {/* Top Shutter Half */}
          <motion.div
            initial={{ y: 0 }}
            animate={stage === "exit" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: EASING.cinematic }}
            className="w-full h-1/2 bg-[#050609] border-b border-white/10 relative"
          />

          {/* Center Telemetry Calibration Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              stage === "exit"
                ? { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
                : { opacity: 1, scale: 1, transition: { duration: 0.4 } }
            }
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10"
          >
            {/* Hologram Monogram */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center font-mono font-black text-amber-400 text-2xl shadow-xl shadow-amber-500/10">
                SK
              </div>
              <div className="absolute -inset-2 border border-dashed border-cyan-500/30 rounded-2xl animate-spin" style={{ animationDuration: "14s" }} />
            </div>

            {/* Diagnostic readout */}
            <div className="text-center space-y-2 max-w-xs w-full">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>[SYS.INIT // CORE]</span>
                <span className="text-amber-400 font-bold">{Math.min(progress, 100)}%</span>
              </div>

              {/* Progress track */}
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-cyan-400"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="text-[10px] font-mono text-gray-500 tracking-wider">
                CALIBRATING 3D ARCHITECTURAL CONSTELLATION
              </div>
            </div>
          </motion.div>

          {/* Bottom Shutter Half */}
          <motion.div
            initial={{ y: 0 }}
            animate={stage === "exit" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: EASING.cinematic }}
            className="w-full h-1/2 bg-[#050609] border-t border-white/10 relative"
          />
        </div>
    </AnimatePresence>
  );
}
