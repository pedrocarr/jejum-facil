/**
 * Abstract storage service interface
 * Allows easy switching between storage implementations
 */
export interface StorageService {
  /**
   * Get item from storage
   */
  getItem<T>(key: string): Promise<T | null>;

  /**
   * Set item in storage
   */
  setItem<T>(key: string, value: T): Promise<void>;

  /**
   * Remove item from storage
   */
  removeItem(key: string): Promise<void>;

  /**
   * Clear all storage
   */
  clear(): Promise<void>;

  /**
   * Get all keys in storage
   */
  getAllKeys(): Promise<string[]>;

  /**
   * Check if key exists in storage
   */
  hasItem(key: string): Promise<boolean>;
}

/**
 * Storage error types
 */
export class StorageError extends Error {
  constructor(message: string, public readonly operation: string, public readonly key?: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class StorageValidationError extends StorageError {
  constructor(message: string, key?: string) {
    super(message, 'validation', key);
    this.name = 'StorageValidationError';
  }
}

export class StorageNotFoundError extends StorageError {
  constructor(key: string) {
    super(`Item not found: ${key}`, 'get', key);
    this.name = 'StorageNotFoundError';
  }
}