import { AsyncStorageService } from './AsyncStorageService';
import { StorageService } from './StorageService';

const storageService: StorageService = new AsyncStorageService();

export { storageService };
export * from './StorageService';
export * from './AsyncStorageService';