// backend/src/storage/storage.resolver.ts
import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { StorageService } from './storage.service';

@ObjectType()
class PresignedUrlResponse {
  @Field()
  uploadUrl!: string;

  @Field()
  publicUrl!: string;
}

@Resolver()
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  @Mutation(() => PresignedUrlResponse)
  async getPresignedUrl(
    @Args('filename') filename: string,
    @Args('contentType') contentType: string,
  ) {
    return this.storageService.getPresignedUploadUrl(filename, contentType);
  }
}