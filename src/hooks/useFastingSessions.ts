import { useState, useEffect, useCallback } from 'react';
import { FastingSession } from '@/types/fasting';
import { FastingSessionService } from '@/services/FastingSessionService';

export interface UseFastingSessionsReturn {
  sessions: FastingSession[];
  loading: boolean;
  error: string | null;
  refreshSessions: () => Promise<void>;
  saveSession: (session: FastingSession) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  getSessionById: (id: string) => FastingSession | undefined;
}

export const useFastingSessions = (): UseFastingSessionsReturn => {
  const [sessions, setSessions] = useState<FastingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSessions = await FastingSessionService.getAllSessions();
      console.log("🚀 ~ useFastingSessions ~ loadedSessions:", loadedSessions)

      setSessions(loadedSessions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions');
      console.error('Error loading sessions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSessions = useCallback(async () => {
    await loadSessions();
  }, [loadSessions]);

  const saveSession = useCallback(async (session: FastingSession) => {
    try {
      setError(null);
      await FastingSessionService.saveSession(session);
      await refreshSessions();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save session';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [refreshSessions]);

  const deleteSession = useCallback(async (id: string) => {
    try {
      setError(null);
      await FastingSessionService.deleteSession(id);
      setSessions(prev => prev.filter(session => session.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete session';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const getSessionById = useCallback((id: string): FastingSession | undefined => {
    return sessions.find(session => session.id === id);
  }, [sessions]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    sessions,
    loading,
    error,
    refreshSessions,
    saveSession,
    deleteSession,
    getSessionById,
  };
};