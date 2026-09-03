/**
 * Motion Design Tokens & Easing Curves
 * Authored for high-precision, cinematic creative technologist portfolios.
 */

export const EASING = {
  // Ultra-smooth bespoke cubic bezier curves
  cinematic: [0.16, 1, 0.3, 1] as const,
  editorial: [0.25, 1, 0.5, 1] as const,
  powerOut: [0.22, 1, 0.36, 1] as const,
  dramatic: [0.76, 0, 0.24, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
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
};

export const TIMINGS = {
  fast: 0.25,
  medium: 0.5,
  slow: 0.85,
  cinematic: 1.1,
  staggerStep: 0.08,
  staggerFast: 0.04,
};
