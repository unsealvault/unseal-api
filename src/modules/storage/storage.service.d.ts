export declare class StorageService {
    private readonly logger;
    private s3;
    private bucketName;
    private publicDomain;
    constructor();
    getPresignedUploadUrl(filename: string, contentType: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
    }>;
}
