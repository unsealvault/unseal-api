// backend/src/storage/storage.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3: S3Client;
  private bucketName = process.env.R2_BUCKET_NAME || 'unseal-vault';
  private publicDomain = process.env.R2_PUBLIC_DOMAIN || '';

  constructor() {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async getPresignedUploadUrl(filename: string, contentType: string) {
    const fileExtension = filename.split('.').pop();
    const uniqueKey = `attachments/${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueKey,
      ContentType: contentType,
    });

    // ৬০ সেকেন্ডের জন্য বৈধ টেম্পোরারি আপলোড ইউআরএল
    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 });
    const publicUrl = `${this.publicDomain}/${uniqueKey}`;

    return { uploadUrl, publicUrl };
  }
}