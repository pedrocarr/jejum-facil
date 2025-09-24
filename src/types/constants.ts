export const FASTING_CATEGORIES = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  PROLONGED: 'prolonged',
  FLEXIBLE: 'flexible'
} as const;

export const STORAGE_KEYS = {
  FASTING_SESSIONS: 'fasting_sessions',
  CURRENT_SESSION: 'current_session',
  USER_STATS: 'user_stats',
  SETTINGS: 'app_settings'
} as const;

export const TIMER_COLORS = {
  GRADIENT_START: '#00C9FF',
  GRADIENT_MID: '#92FE9D',
  GRADIENT_END: '#FCEE09',
  WARNING: '#FF6B35',
  DANGER: '#FF0099',
  PRIMARY: '#663399',
  SUCCESS: '#4CAF50',
  BACKGROUND: '#F0F8FF'
} as const;

export const TIMER_GRADIENTS = {
  OCEAN: ['#00C9FF', '#92FE9D'],
  SUNSET: ['#FF6B35', '#F7931E'],
  PURPLE: ['#667eea', '#764ba2'],
  MINT: ['#00F260', '#0575E6'],
  CHERRY: ['#EB3349', '#F45C43']
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  MEDIUM: 400,
  SLOW: 600
} as const;

export const TIMER_MILESTONES = {
  QUARTER: 0.25,
  HALF: 0.5,
  THREE_QUARTER: 0.75,
  COMPLETE: 1
} as const;