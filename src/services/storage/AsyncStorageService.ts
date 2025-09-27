import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService, StorageError, StorageValidationError } from './StorageService';

export class AsyncStorageService implements StorageService {
  private readonly keyPrefix: string;

  constructor(keyPrefix: string = 'fasting_app_') {
    this.keyPrefix = keyPrefix;
  }

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      const item = await AsyncStorage.getItem(fullKey);

      if (item === null) {
        return null;
      }

      const parsed = JSON.parse(item);
      return parsed as T;
    } catch (error) {
      throw new StorageError(
        `Failed to get item: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'get',
        key
      );
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      if (value === undefined) {
        throw new StorageValidationError('Cannot store undefined value', key);
      }

      const fullKey = this.getFullKey(key);
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(fullKey, serialized);
    } catch (error) {
      if (error instanceof StorageValidationError) {
        throw error;
      }
      throw new StorageError(
        `Failed to set item: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'set',
        key
      );
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      await AsyncStorage.removeItem(fullKey);
    } catch (error) {
      throw new StorageError(
        `Failed to remove item: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'remove',
        key
      );
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      const fullKeys = keys.map(key => this.getFullKey(key));
      await AsyncStorage.multiRemove(fullKeys);
    } catch (error) {
      throw new StorageError(
        `Failed to clear storage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'clear'
      );
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys
        .filter(key => key.startsWith(this.keyPrefix))
        .map(key => key.replace(this.keyPrefix, ''));
    } catch (error) {
      throw new StorageError(
        `Failed to get all keys: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'getAllKeys'
      );
    }
  }

  async hasItem(key: string): Promise<boolean> {
    try {
      const item = await this.getItem(key);
      return item !== null;
    } catch (error) {
      return false;
    }
  }

  async getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const fullKeys = keys.map(key => this.getFullKey(key));
      const results = await AsyncStorage.multiGet(fullKeys);

      const parsedResults: Record<string, T | null> = {};

      results.forEach(([fullKey, value], index) => {
        const originalKey = keys[index];
        if (value !== null) {
          try {
            parsedResults[originalKey] = JSON.parse(value) as T;
          } catch (parseError) {
            parsedResults[originalKey] = null;
          }
        } else {
          parsedResults[originalKey] = null;
        }
      });

      return parsedResults;
    } catch (error) {
      throw new StorageError(
        `Failed to get multiple items: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'getMultiple'
      );
    }
  }

  async setMultiple<T>(items: Record<string, T>): Promise<void> {
    try {
      const keyValuePairs: [string, string][] = Object.entries(items).map(([key, value]) => [
        this.getFullKey(key),
        JSON.stringify(value),
      ]);

      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      throw new StorageError(
        `Failed to set multiple items: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'setMultiple'
      );
    }
  }
}