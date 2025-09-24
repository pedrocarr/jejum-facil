import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState, FastingSession } from '@/types/fasting';
import { parsePlanDuration, generateSessionId, calculateSessionDuration } from '@/utils/fasting';
import { FastingSessionService } from '@/services/FastingSessionService';
import { AppState, AppStateStatus } from 'react-native';

export interface UseFastingTimerProps {
  planId: string;
  planTitle: string;
  onComplete?: (session: FastingSession) => void;
  onMilestone?: (milestone: number, duration: number) => void;
}

export interface UseFastingTimerReturn {
  timerState: TimerState;
  currentSession: FastingSession | null;
  isRestored: boolean;
  startTimer: () => Promise<void>;
  stopTimer: () => Promise<void>;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
}

export const useFastingTimer = ({
  planId,
  planTitle,
  onComplete,
  onMilestone,
}: UseFastingTimerProps): UseFastingTimerReturn => {
  const [timerState, setTimerState] = useState<TimerState>({
    isStarted: false,
    isPaused: false,
    startTime: null,
    duration: null,
    elapsedTime: 0,
    remainingTime: 0,
    isFlexible: false,
  });

  const [currentSession, setCurrentSession] = useState<FastingSession | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundTimeRef = useRef<number | null>(null);
  const [isRestored, setIsRestored] = useState(false);

  const { isFlexible, duration } = parsePlanDuration(planTitle);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedSession = await FastingSessionService.getCurrentSession();
        if (savedSession && !savedSession.isCompleted) {
          setCurrentSession(savedSession);

          const now = Date.now();
          const elapsed = Math.floor((now - savedSession.startTime) / 1000);
          const planData = parsePlanDuration(savedSession.planTitle);

          setTimerState({
            isStarted: true,
            isPaused: false,
            startTime: savedSession.startTime,
            duration: planData.duration,
            elapsedTime: elapsed,
            remainingTime: planData.duration ? Math.max(0, planData.duration - elapsed) : 0,
            isFlexible: planData.isFlexible,
          });
        }
      } catch (error) {
        console.error('Error restoring session:', error);
      } finally {
        setIsRestored(true);
      }
    };

    restoreSession();
  }, []);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (timerState.isStarted && !timerState.isPaused) {
        if (nextAppState === 'background') {
          backgroundTimeRef.current = Date.now();
        } else if (nextAppState === 'active' && backgroundTimeRef.current) {
          // Adjust timer for time spent in background
          const backgroundDuration = Math.floor((Date.now() - backgroundTimeRef.current) / 1000);
          setTimerState(prev => ({
            ...prev,
            elapsedTime: prev.elapsedTime + backgroundDuration,
            remainingTime: Math.max(0, prev.remainingTime - backgroundDuration),
          }));
          backgroundTimeRef.current = null;
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [timerState.isStarted, timerState.isPaused]);

  // Timer tick
  useEffect(() => {
    if (timerState.isStarted && !timerState.isPaused && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - timerState.startTime!) / 1000);

        setTimerState(prev => {
          const newElapsed = elapsed;
          const newRemaining = prev.isFlexible ? 0 : Math.max(0, prev.duration! - newElapsed);

          // Check for completion
          if (!prev.isFlexible && newRemaining <= 0) {
            // Timer completed
            if (currentSession && onComplete) {
              const completedSession: FastingSession = {
                ...currentSession,
                endTime: now,
                duration: newElapsed,
                isCompleted: true,
                updatedAt: now,
              };
              onComplete(completedSession);
            }
          }

          return {
            ...prev,
            elapsedTime: newElapsed,
            remainingTime: newRemaining,
          };
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [timerState.isStarted, timerState.isPaused, timerState.startTime, currentSession, onComplete]);

  const startTimer = useCallback(async () => {
    const now = Date.now();
    const sessionId = generateSessionId();

    const newSession: FastingSession = {
      id: sessionId,
      planId,
      planTitle,
      startTime: now,
      duration: 0,
      isCompleted: false,
      isFlexible,
      createdAt: now,
      updatedAt: now,
    };

    // Save current session for persistence
    try {
      await FastingSessionService.saveCurrentSession(newSession);
    } catch (error) {
      console.error('Error saving current session:', error);
    }

    setCurrentSession(newSession);
    setTimerState({
      isStarted: true,
      isPaused: false,
      startTime: now,
      duration,
      elapsedTime: 0,
      remainingTime: duration || 0,
      isFlexible,
    });
  }, [planId, planTitle, isFlexible, duration]);

  const stopTimer = useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentSession) {
      const now = Date.now();
      const finalDuration = calculateSessionDuration(currentSession.startTime, now);

      const completedSession: FastingSession = {
        ...currentSession,
        endTime: now,
        duration: finalDuration,
        isCompleted: true,
        updatedAt: now,
      };

      // Save session to storage
      try {
        await FastingSessionService.saveSession(completedSession);
        await FastingSessionService.clearCurrentSession();
      } catch (error) {
        console.error('Error saving session:', error);
      }

      onComplete?.(completedSession);
    }

    setTimerState({
      isStarted: false,
      isPaused: false,
      startTime: null,
      duration: null,
      elapsedTime: 0,
      remainingTime: 0,
      isFlexible: false,
    });

    setCurrentSession(null);
  }, [currentSession, onComplete]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimerState(prev => ({
      ...prev,
      isPaused: true,
    }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isPaused: false,
    }));
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimerState({
      isStarted: false,
      isPaused: false,
      startTime: null,
      duration: null,
      elapsedTime: 0,
      remainingTime: 0,
      isFlexible: false,
    });

    setCurrentSession(null);
  }, []);

  return {
    timerState,
    currentSession,
    isRestored,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
};