import { FastingSession, FastingStats } from '@/types/fasting';
import { STORAGE_KEYS } from '@/types/constants';
import { storageService, StorageError } from './storage';
import { validateSession, calculateStats, isSessionCompleted } from '@/utils/fasting';

export class FastingSessionService {
  /**
   * Save a fasting session
   */
  static async saveSession(session: FastingSession): Promise<void> {
    try {
      if (!validateSession(session)) {
        throw new Error('Invalid session data');
      }

      // Get existing sessions
      const sessions = await this.getAllSessions();

      // Update if exists, otherwise add new
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }

      // Sort by creation date (newest first)
      sessions.sort((a, b) => b.createdAt - a.createdAt);

      await storageService.setItem(STORAGE_KEYS.FASTING_SESSIONS, sessions);
    } catch (error) {
      throw new StorageError(
        `Failed to save session: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'saveSession',
        session.id
      );
    }
  }

  /**
   * Get all fasting sessions
   */
  static async getAllSessions(): Promise<FastingSession[]> {
    try {
      const sessions = await storageService.getItem<FastingSession[]>(STORAGE_KEYS.FASTING_SESSIONS);
      return sessions || [];
    } catch (error) {
      console.warn('Error loading sessions:', error);
      return [];
    }
  }

  /**
   * Get session by ID
   */
  static async getSessionById(id: string): Promise<FastingSession | null> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.find(session => session.id === id) || null;
    } catch (error) {
      throw new StorageError(
        `Failed to get session: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'getSession',
        id
      );
    }
  }

  /**
   * Delete session by ID
   */
  static async deleteSession(id: string): Promise<void> {
    try {
      const sessions = await this.getAllSessions();
      const filteredSessions = sessions.filter(session => session.id !== id);

      await storageService.setItem(STORAGE_KEYS.FASTING_SESSIONS, filteredSessions);
    } catch (error) {
      throw new StorageError(
        `Failed to delete session: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'deleteSession',
        id
      );
    }
  }

  /**
   * Get sessions within date range
   */
  static async getSessionsByDateRange(startDate: number, endDate: number): Promise<FastingSession[]> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.filter(
        session => session.createdAt >= startDate && session.createdAt <= endDate
      );
    } catch (error) {
      console.warn('Error loading sessions by date range:', error);
      return [];
    }
  }

  /**
   * Get completed sessions only
   */
  static async getCompletedSessions(): Promise<FastingSession[]> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.filter(isSessionCompleted);
    } catch (error) {
      console.warn('Error loading completed sessions:', error);
      return [];
    }
  }

  /**
   * Get recent sessions (last N sessions)
   */
  static async getRecentSessions(limit: number = 10): Promise<FastingSession[]> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.slice(0, limit);
    } catch (error) {
      console.warn('Error loading recent sessions:', error);
      return [];
    }
  }

  /**
   * Save current session (for persistence across app restarts)
   */
  static async saveCurrentSession(session: FastingSession): Promise<void> {
    try {
      await storageService.setItem(STORAGE_KEYS.CURRENT_SESSION, session);
    } catch (error) {
      throw new StorageError(
        `Failed to save current session: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'saveCurrentSession',
        session.id
      );
    }
  }

  /**
   * Get current session (for restoration after app restart)
   */
  static async getCurrentSession(): Promise<FastingSession | null> {
    try {
      return await storageService.getItem<FastingSession>(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
      console.warn('Error loading current session:', error);
      return null;
    }
  }

  /**
   * Clear current session
   */
  static async clearCurrentSession(): Promise<void> {
    try {
      await storageService.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
      console.warn('Error clearing current session:', error);
    }
  }

  /**
   * Calculate and cache user statistics
   */
  static async calculateAndCacheStats(): Promise<FastingStats> {
    try {
      const sessions = await this.getAllSessions();
      const stats = calculateStats(sessions);

      // Cache the stats
      await storageService.setItem(STORAGE_KEYS.USER_STATS, {
        ...stats,
        calculatedAt: Date.now(),
      });

      return stats;
    } catch (error) {
      throw new StorageError(
        `Failed to calculate stats: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'calculateStats'
      );
    }
  }

  /**
   * Get cached statistics
   */
  static async getCachedStats(): Promise<(FastingStats & { calculatedAt: number }) | null> {
    try {
      return await storageService.getItem<FastingStats & { calculatedAt: number }>(STORAGE_KEYS.USER_STATS);
    } catch (error) {
      console.warn('Error loading cached stats:', error);
      return null;
    }
  }

  /**
   * Export all sessions data
   */
  static async exportSessionsData(): Promise<{
    sessions: FastingSession[];
    stats: FastingStats;
    exportedAt: number;
  }> {
    try {
      const sessions = await this.getAllSessions();
      const stats = calculateStats(sessions);

      return {
        sessions,
        stats,
        exportedAt: Date.now(),
      };
    } catch (error) {
      throw new StorageError(
        `Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'exportData'
      );
    }
  }

  /**
   * Clear all session data
   */
  static async clearAllData(): Promise<void> {
    try {
      await Promise.all([
        storageService.removeItem(STORAGE_KEYS.FASTING_SESSIONS),
        storageService.removeItem(STORAGE_KEYS.CURRENT_SESSION),
        storageService.removeItem(STORAGE_KEYS.USER_STATS),
      ]);
    } catch (error) {
      throw new StorageError(
        `Failed to clear all data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'clearAllData'
      );
    }
  }
}