# Phase 1: Foundation & Architecture

## Overview
Establish the foundation for enhanced fasting app functionality with proper TypeScript types, data models, and project structure.

## Goals
1. Create comprehensive TypeScript interfaces for fasting data
2. Set up proper data models for persistence
3. Establish clean project structure
4. Create initial git commit for baseline

## Implementation Steps

### 1. TypeScript Interfaces

Create `src/types/fasting.ts`:
```typescript
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
}

export interface FastingStats {
  totalSessions: number;
  completedSessions: number;
  totalFastingTime: number; // seconds
  averageSessionLength: number; // seconds
  longestFast: number; // seconds
  currentStreak: number;
  bestStreak: number;
}
```

### 2. Constants and Enums

Create `src/types/constants.ts`:
```typescript
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
  GRADIENT_END: '#92FE9D',
  WARNING: '#FCEE09',
  DANGER: '#FF0099',
  PRIMARY: '#663399'
} as const;
```

### 3. Utility Functions

Create `src/utils/fasting.ts`:
```typescript
import { FastingPlan, FastingSession } from '@/types/fasting';

export const parsePlanDuration = (planTitle: string): { isFlexible: boolean; duration: number | null } => {
  if (planTitle === 'Flexível') {
    return { isFlexible: true, duration: null };
  }

  if (planTitle.includes(':')) {
    const [fastingHours] = planTitle.split(':');
    return { isFlexible: false, duration: Number(fastingHours) * 3600 };
  }

  if (planTitle.includes('h')) {
    const hours = parseInt(planTitle.replace('h', ''));
    return { isFlexible: false, duration: hours * 3600 };
  }

  const hours = parseInt(planTitle);
  if (!isNaN(hours)) {
    return { isFlexible: false, duration: hours * 3600 };
  }

  return { isFlexible: true, duration: null };
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const calculateSessionDuration = (startTime: number, endTime?: number): number => {
  const end = endTime || Date.now();
  return Math.floor((end - startTime) / 1000);
};

export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
```

## Files to Create
- `src/types/fasting.ts`
- `src/types/constants.ts`
- `src/utils/fasting.ts`
- `src/hooks/` (directory for custom hooks in next phase)
- `src/services/` (directory for data persistence in next phase)

## Success Criteria
- [ ] All TypeScript interfaces defined
- [ ] Utility functions created and tested
- [ ] Constants properly organized
- [ ] Project structure established
- [ ] Git commit created for baseline

## Next Phase
Phase 2 will focus on enhancing the timer implementation with gradients and improved visual feedback.