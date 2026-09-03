"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "./motionTokens";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  scale?: number;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.75,
  className = "",
  once = true,
  scale = 1,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: shouldReduceMotion ? 1 : scale < 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASING.cinematic,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
