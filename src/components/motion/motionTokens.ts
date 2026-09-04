/**
 * Reusable Motion Design System Tokens & Physics
 * Authored for high-precision, cinematic creative technologist portfolios.
 * Encodes Emil Kowalski's interaction principles: physical, intentional, interruptible.
 */

export const EASING = {
  // Ultra-smooth bespoke cubic bezier curves
  cinematic: [0.16, 1, 0.3, 1] as const,
  editorial: [0.25, 1, 0.5, 1] as const,
  powerOut: [0.22, 1, 0.36, 1] as const,
  dramatic: [0.76, 0, 0.24, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  smooth: [0.65, 0, 0.35, 1] as const,
};

export const SPRINGS = {
  // Tactile spring physics for magnetic buttons and cursor tracking
  magnetic: {
    type: "spring",
    damping: 18,
    stiffness: 220,
    mass: 0.6,
  } as const,
  snappy: {
    type: "spring",
    damping: 24,
    stiffness: 300,
    mass: 0.8,
  } as const,
  gentle: {
    type: "spring",
    damping: 30,
    stiffness: 120,
    mass: 1.0,
  } as const,
  bounceSubtle: {
    type: "spring",
    damping: 16,
    stiffness: 240,
    mass: 0.7,
  } as const,
  interactive: {
    type: "spring",
    damping: 20,
    stiffness: 260,
    mass: 0.5,
  } as const,
};

export const TIMINGS = {
  micro: 0.12,
  fast: 0.22,
  normal: 0.35,
  medium: 0.5,
  slow: 0.75,
  cinematic: 1.1,
  staggerStep: 0.07,
  staggerFast: 0.035,
};

export const DISTANCES = {
  micro: 6,
  compact: 14,
  default: 24,
  editorial: 40,
  dramatic: 72,
};

export const SCALES = {
  pressed: 0.97,
  hoverSubtle: 1.02,
  hoverProminent: 1.04,
  entrance: 0.95,
  modalStart: 0.92,
};

export const OPACITY = {
  hidden: 0,
  ghost: 0.35,
  muted: 0.65,
  visible: 1,
};

export const BLURS = {
  none: "blur(0px)",
  subtle: "blur(4px)",
  soft: "blur(8px)",
  heavy: "blur(16px)",
  glass: "blur(24px)",
};

export const DEPTH_3D = {
  flat: 0,
  cardHover: 20,
  monolithCore: 50,
  deepParallax: 120,
};
