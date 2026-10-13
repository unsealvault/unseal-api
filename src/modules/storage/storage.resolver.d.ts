import { StorageService } from './storage.service';
export declare class StorageResolver {
    private readonly storageService;
    constructor(storageService: StorageService);
    getPresignedUrl(filename: string, contentType: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
    }>;
}
