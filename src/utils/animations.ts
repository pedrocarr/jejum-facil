import { ANIMATION_DURATIONS } from '@/types/constants';

/**
 * Standard easing curves for animations
 */
export const EASING = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * Animation configurations for different timer states
 */
export const TIMER_ANIMATIONS = {
  START: {
    duration: ANIMATION_DURATIONS.MEDIUM,
    easing: EASING.easeOut,
  },
  PAUSE: {
    duration: ANIMATION_DURATIONS.FAST,
    easing: EASING.ease,
  },
  COMPLETE: {
    duration: ANIMATION_DURATIONS.SLOW,
    easing: EASING.bounce,
  },
  MILESTONE: {
    duration: ANIMATION_DURATIONS.MEDIUM,
    easing: EASING.easeInOut,
  },
} as const;

/**
 * Pulse animation configuration
 */
export const PULSE_ANIMATION = {
  duration: 1000,
  iterations: -1, // infinite
  direction: 'alternate' as const,
  easing: EASING.easeInOut,
} as const;

/**
 * Generate gradient colors based on progress
 */
export const getProgressGradient = (progress: number): string[] => {
  if (progress >= 0.9) return ['#4CAF50', '#8BC34A']; // Success green
  if (progress >= 0.75) return ['#FF9800', '#FFC107']; // Warning orange
  if (progress >= 0.5) return ['#2196F3', '#03DAC6']; // Info blue
  if (progress >= 0.25) return ['#9C27B0', '#E91E63']; // Primary purple
  return ['#00BCD4', '#4DD0E1']; // Start cyan
};

/**
 * Calculate milestone positions for timer circle
 */
export const getMilestonePositions = (totalDuration: number): number[] => {
  const milestones = [0.25, 0.5, 0.75]; // 25%, 50%, 75%
  return milestones.map(milestone => milestone * totalDuration);
};

/**
 * Get celebration animation based on milestone
 */
export const getCelebrationAnimation = (milestone: number) => {
  const animations = {
    0.25: { scale: 1.1, rotation: '5deg', color: '#FF9800' },
    0.5: { scale: 1.15, rotation: '10deg', color: '#2196F3' },
    0.75: { scale: 1.2, rotation: '15deg', color: '#9C27B0' },
    1: { scale: 1.3, rotation: '20deg', color: '#4CAF50' },
  };

  return animations[milestone as keyof typeof animations] || animations[0.25];
};

/**
 * Interpolate between two colors
 */
export const interpolateColor = (color1: string, color2: string, progress: number): string => {
  // Simple color interpolation (can be enhanced with proper color library)
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};