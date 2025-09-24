export interface FastingPlan {
  id: string;
  title: string;
  fastingDescription: string;
  feedingDescription?: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'prolonged' | 'flexible';
}

export interface FastingSession {
  id: string;
  planId: string;
  planTitle: string;
  startTime: number; // Unix timestamp
  endTime?: number; // Unix timestamp
  duration: number; // seconds
  isCompleted: boolean;
  isFlexible: boolean;
  notes?: string;
  rating?: number; // 1-5
  createdAt: number;
  updatedAt: number;
}

export interface TimerState {
  isStarted: boolean;
  isPaused: boolean;
  startTime: number | null;
  duration: number | null;
  elapsedTime: number;
  remainingTime: number;
  isFlexible: boolean;
}

export interface FastingStats {
  totalSessions: number;
  completedSessions: number;
  totalFastingTime: number; // seconds
  averageSessionLength: number; // seconds
  longestFast: number; // seconds
  currentStreak: number;
  bestStreak: number;
  lastSessionDate?: number;
}

export interface TimerColors {
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  success: string;
}

export interface GradientConfig {
  colors: string[];
  locations?: number[];
  angle?: number;
}