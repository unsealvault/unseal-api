// src/letter/letter.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LetterService } from './letter.service';
import { CreateLetterInput, LetterType } from './dto/letter.input';

@Resolver(() => LetterType)
export class LetterResolver {
  constructor(private readonly letterService: LetterService) {}

  // ১. চিঠি সিল করার মিউটেশন (Create / Seal Letter)
  @Mutation(() => LetterType)
  async sealLetter(
    @Args('input') input: CreateLetterInput,
  ): Promise<LetterType> {
    return this.letterService.sealLetter(input);
  }

  // ২. আইডি দিয়ে নির্দিষ্ট চিঠি খোঁজা (Unseal Reader Page-এর জন্য)
  @Query(() => LetterType, { nullable: true })
  async getLetterById(
    @Args('id') id: string,
  ): Promise<LetterType> {
    return this.letterService.findById(id);
  }

  // ৩. পাবলিক ভল্টের উন্মুক্ত চিঠিগুলো পাওয়ার কুয়েরি
  @Query(() => [LetterType])
  async publicVault(): Promise<LetterType[]> {
    return this.letterService.getPublicLetters();
  }
}