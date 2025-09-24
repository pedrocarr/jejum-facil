import { useState, useEffect, useCallback } from 'react';
import { FastingStats } from '@/types/fasting';
import { FastingSessionService } from '@/services/FastingSessionService';

export interface UseFastingStatsReturn {
  stats: FastingStats | null;
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

export const useFastingStats = (): UseFastingStatsReturn => {
  const [stats, setStats] = useState<FastingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get cached stats first
      const cachedStats = await FastingSessionService.getCachedStats();
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      // Use cached stats if they're less than 1 hour old
      if (cachedStats && (now - cachedStats.calculatedAt) < oneHour) {
        const { calculatedAt, ...statsData } = cachedStats;
        setStats(statsData);
        setLoading(false);
        return;
      }

      // Calculate fresh stats
      const freshStats = await FastingSessionService.calculateAndCacheStats();
      setStats(freshStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      setError(null);
      const freshStats = await FastingSessionService.calculateAndCacheStats();
      setStats(freshStats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh stats';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
};