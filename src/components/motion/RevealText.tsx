"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "./motionTokens";

interface RevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function RevealText({
  text,
  className = "",
  wordClassName = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.05,
  once = true,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : "115%",
      opacity: shouldReduceMotion ? 1 : 0,
      rotateX: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: EASING.cinematic,
      },
    },
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10% 0px" }}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.05em] overflow-hidden"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-0.5">
            <motion.span variants={wordVariants} className={`inline-block will-change-transform ${wordClassName}`}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
