import { FastingPlan, FastingSession, FastingStats } from '@/types/fasting';

/**
 * Parse a fasting plan title to extract duration information
 */
export const parsePlanDuration = (planTitle: string): { isFlexible: boolean; duration: number | null } => {
  if (planTitle === 'Flexível') {
    return { isFlexible: true, duration: null };
  }

  if (planTitle.includes(':')) {
    const [fastingHours] = planTitle.split(':');
    const hours = parseInt(fastingHours);
    if (!isNaN(hours)) {
      return { isFlexible: false, duration: hours * 3600 };
    }
  }

  if (planTitle.includes('h')) {
    const hours = parseInt(planTitle.replace('h', ''));
    if (!isNaN(hours)) {
      return { isFlexible: false, duration: hours * 3600 };
    }
  }

  const hours = parseInt(planTitle);
  if (!isNaN(hours)) {
    return { isFlexible: false, duration: hours * 3600 };
  }

  return { isFlexible: true, duration: null };
};

/**
 * Format seconds into HH:MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format seconds into human-readable duration (e.g., "2h 30m")
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return '< 1m';
  }
};

/**
 * Calculate session duration between two timestamps
 */
export const calculateSessionDuration = (startTime: number, endTime?: number): number => {
  const end = endTime || Date.now();
  return Math.floor((end - startTime) / 1000);
};

/**
 * Generate unique session ID
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if a session was completed successfully
 */
export const isSessionCompleted = (session: FastingSession): boolean => {
  if (session.isFlexible) {
    return session.isCompleted && session.duration > 0;
  }

  const planDuration = parsePlanDuration(session.planTitle);
  if (!planDuration.duration) return false;

  return session.duration >= planDuration.duration * 0.9; // Allow 10% tolerance
};

/**
 * Calculate completion percentage for a session
 */
export const getSessionProgress = (session: FastingSession): number => {
  if (session.isFlexible) {
    return session.isCompleted ? 100 : 0;
  }

  const planDuration = parsePlanDuration(session.planTitle);
  if (!planDuration.duration) return 0;

  return Math.min(100, (session.duration / planDuration.duration) * 100);
};

/**
 * Get timer colors based on progress
 */
export const getTimerColors = (progress: number): string[] => {
  if (progress >= 0.75) return ['#4CAF50', '#8BC34A']; // Green
  if (progress >= 0.5) return ['#FF9800', '#FFC107']; // Orange
  if (progress >= 0.25) return ['#00BCD4', '#03DAC6']; // Cyan
  return ['#2196F3', '#03DAC6']; // Blue
};

/**
 * Calculate user statistics from sessions array
 */
export const calculateStats = (sessions: FastingSession[]): FastingStats => {
  const completedSessions = sessions.filter(isSessionCompleted);
  const totalFastingTime = sessions.reduce((sum, session) => sum + session.duration, 0);

  const stats: FastingStats = {
    totalSessions: sessions.length,
    completedSessions: completedSessions.length,
    totalFastingTime,
    averageSessionLength: sessions.length > 0 ? totalFastingTime / sessions.length : 0,
    longestFast: sessions.reduce((max, session) => Math.max(max, session.duration), 0),
    currentStreak: 0,
    bestStreak: 0,
  };

  // Calculate streaks
  let currentStreak = 0;
  let bestStreak = 0;

  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort((a, b) => b.createdAt - a.createdAt);

  for (const session of sortedSessions) {
    if (isSessionCompleted(session)) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      if (stats.currentStreak === 0) {
        stats.currentStreak = currentStreak;
      }
      currentStreak = 0;
    }
  }

  if (stats.currentStreak === 0) {
    stats.currentStreak = currentStreak;
  }
  stats.bestStreak = bestStreak;

  // Set last session date
  if (sessions.length > 0) {
    stats.lastSessionDate = Math.max(...sessions.map(s => s.createdAt));
  }

  return stats;
};

/**
 * Validate session data
 */
export const validateSession = (session: Partial<FastingSession>): boolean => {
  return !!(
    session.id &&
    session.planId &&
    session.planTitle &&
    session.startTime &&
    typeof session.isFlexible === 'boolean' &&
    session.duration !== undefined &&
    session.createdAt
  );
};