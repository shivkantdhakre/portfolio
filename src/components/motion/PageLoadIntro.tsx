"use client";

import React, { useState, useEffect, useCallback } from "react";
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

  const handleDismiss = useCallback(() => {
    setStage("exit");
    setTimeout(() => {
      setStage("complete");
      onComplete?.();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    // Swift, crisp shutter reveal on mount (under 300ms, respecting Emil Kowalski principles)
    const timerComplete = setTimeout(() => {
      setStage("exit");
    }, 120);

    const timerExit = setTimeout(() => {
      setStage("complete");
      onComplete?.();
    }, 420);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        clearTimeout(timerComplete);
        clearTimeout(timerExit);
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timerComplete);
      clearTimeout(timerExit);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldReduceMotion, handleDismiss, onComplete]);

  if (stage === "complete" || shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      <div 
        onClick={handleDismiss}
        title="Click to dismiss"
        className="fixed inset-0 z-50 pointer-events-auto cursor-pointer flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Top Shutter Half */}
        <motion.div
          initial={{ y: 0 }}
          animate={stage === "exit" ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.35, ease: EASING.powerOut }}
          className="w-full h-1/2 bg-[#050609] border-b border-white/10 relative flex items-end justify-center pb-4"
        >
          <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase opacity-60">
            SHIV KANT DHAKRE // ENGINEERING PORTFOLIO
          </div>
        </motion.div>

        {/* Center Kinetic Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            stage === "exit" 
              ? { opacity: 0, scaleY: 0, transition: { duration: 0.15 } }
              : { scaleX: 1, opacity: 1, transition: { duration: 0.25, ease: EASING.powerOut } }
          }
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent z-20 pointer-events-none"
        />

        {/* Center Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            stage === "exit"
              ? { opacity: 0, scale: 1.02, transition: { duration: 0.2 } }
              : { opacity: 1, scale: 1, transition: { duration: 0.2 } }
          }
          className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-none"
        >
          <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center font-mono font-black text-amber-400 text-xl shadow-lg shadow-amber-500/10">
            SK
          </div>
        </motion.div>

        {/* Bottom Shutter Half */}
        <motion.div
          initial={{ y: 0 }}
          animate={stage === "exit" ? { y: "100%" } : { y: 0 }}
          transition={{ duration: 0.35, ease: EASING.powerOut }}
          className="w-full h-1/2 bg-[#050609] border-t border-white/10 relative flex items-start justify-center pt-4"
        >
          <div className="text-[10px] font-mono tracking-widest text-gray-600 uppercase opacity-50">
            SYSTEMS OVER SCREENS // 2026
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
