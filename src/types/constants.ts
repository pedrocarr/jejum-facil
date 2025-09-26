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

// Fasting Plans
export type FastingPlans = Array<Record<string, string>>

export const beginnerPlans: FastingPlans = [
  {
    id: 'bg-1',
    title: "11:13",
    fastingDescription: "11 horas de jejum",
    feedingDescription: "13 horas de alimentação"
  },
  {
    id: 'bg-2',
    title: "12:12",
    fastingDescription: "12 horas de jejum",
    feedingDescription: "12 horas de alimentação"
  },
  {
    id: 'bg-3',
    title: "13:11",
    fastingDescription: "13 horas de jejum",
    feedingDescription: "11 horas de alimentação"
  },
  {
    id: 'bg-4',
    title: "14:10",
    fastingDescription: "14 horas de jejum",
    feedingDescription: "10 horas de alimentação"
  },
  {
    id: 'bg-5',
    title: "15:9",
    fastingDescription: "15 horas de jejum",
    feedingDescription: "9 horas de alimentação"
  },
];

export const intermediatePlans: FastingPlans = [
  {
    id: 'intermediate-1',
    title: "16:8",
    fastingDescription: "16 horas de jejum",
    feedingDescription: "8 horas de alimentação"
  },
  {
    id: 'intermediate-2',
    title: "17:7",
    fastingDescription: "17 horas de jejum",
    feedingDescription: "7 horas de alimentação"
  },
  {
    id: 'intermediate-3',
    title: "18:6",
    fastingDescription: "18 horas de jejum",
    feedingDescription: "6 horas de alimentação"
  },
  {
    id: 'intermediate-4',
    title: "19:5",
    fastingDescription: "19 horas de jejum",
    feedingDescription: "5 horas de alimentação"
  },
];

export const advancedPlans: FastingPlans = [
  {
    id: 'advanced-1',
    title: "20:4",
    fastingDescription: "20 horas de jejum",
    feedingDescription: "4 horas de alimentação"
  },
  {
    id: 'advanced-2',
    title: "21:3",
    fastingDescription: "21 horas de jejum",
    feedingDescription: "3 horas de alimentação"
  },
  {
    id: 'advanced-3',
    title: "22:2",
    fastingDescription: "22 horas de jejum",
    feedingDescription: "2 horas de alimentação"
  },
  {
    id: 'advanced-4',
    title: "23:1",
    fastingDescription: "23 horas de jejum",
    feedingDescription: "1 horas de alimentação"
  },
];

export const pronlongedFastingPlans: FastingPlans = [
  {
    id: 'prolonged-1',
    title: "24h",
    fastingDescription: "24 horas de jejum",
  },
  {
    id: 'prolonged-2',
    title: "36h",
    fastingDescription: "36 horas de jejum",
  },
  {
    id: 'prolonged-3',
    title: "42h",
    fastingDescription: "42 horas de jejum",
  },
  {
    id: 'prolonged-4',
    title: "48h",
    fastingDescription: "48 horas de jejum",
  },
  {
    id: 'prolonged-5',
    title: "72h",
    fastingDescription: "72 horas de jejum",
  },
];

// Tips
export const tips: Array<Record<string, string>> = [
  {
    id: 'tips-1',
    title: "Mantenha-se hidratado",
    content: "Beba bastante água durante o jejum para manter-se hidratado.",
    emoji: "💧"
  },
  {
    id: 'tips-2',
    title: "Cuidado ao se realimentar",
    content: "Evite alimentos processados e ricos em açúcar durante o período de alimentação.",
    emoji: "🥗"
  },
  {
    id: 'tips-3',
    title: "Tenha uma alimentação balanceada",
    content: "Inclua alimentos ricos em fibras, como frutas, vegetais e grãos integrais, para ajudar na saciedade.",
    emoji: "🍎"
  },
  {
    id: 'tips-4',
    title: "Descanse longe de telas",
    content: "Durma bem, pois o sono adequado é essencial para o sucesso do jejum.",
    emoji: "😴"
  },
  {
    id: 'tips-5',
    title: "Comece devagar",
    content: "Comece com jejuns mais curtos e aumente gradualmente a duração conforme seu corpo se adapta.",
    emoji: "🐢"
  },
  {
    id: 'tips-6',
    title: "Ouça seu corpo",
    content: "Ouça seu corpo e interrompa o jejum se sentir tonturas, fraqueza extrema ou outros sintomas preocupantes.",
    emoji: "👂"
  },
  {
    id: 'tips-7',
    title: "Faça atividades",
    content: "Mantenha-se ocupado durante o período de jejum para evitar pensar em comida.",
    emoji: "🎯"
  },
  {
    id: 'tips-8',
    title: "Consulte seu médico",
    content: "Consulte um profissional de saúde antes de iniciar qualquer regime de jejum, especialmente se tiver condições médicas preexistentes.",
    emoji: "👩‍⚕️"
  }
];