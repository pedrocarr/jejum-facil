import { AsyncStorageService } from './AsyncStorageService';
import { StorageService } from './StorageService';

// Create singleton instance
const storageService: StorageService = new AsyncStorageService();

export { storageService };
export * from './StorageService';
export * from './AsyncStorageService';