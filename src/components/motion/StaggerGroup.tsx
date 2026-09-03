"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "./motionTokens";

interface StaggerGroupProps {
  children: React.ReactNode;
  staggerInterval?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerGroup({
  children,
  staggerInterval = 0.08,
  delay = 0,
  className = "",
  once = true,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerInterval,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 24,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: EASING.cinematic,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
