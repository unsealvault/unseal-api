// src/letter/letter.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LetterService } from './letter.service';
import { CreateLetterInput, LetterType } from './dto/letter.input';

@Resolver(() => LetterType)
export class LetterResolver {
  constructor(private readonly letterService: LetterService) {}

  // Create / Seal Letter
  @Mutation(() => LetterType)
  async sealLetter(
    @Args('input') input: CreateLetterInput,
  ): Promise<LetterType> {
    return this.letterService.sealLetter(input);
  }

  // ২. Unseal Letter by id
  @Query(() => LetterType, { nullable: true })
  async getLetterById(
    @Args('id') id: string,
  ): Promise<LetterType> {
    return this.letterService.findById(id);
  }

  // ৩. Unsell Letter for Public Vault
  @Query(() => [LetterType])
  async publicVault(): Promise<LetterType[]> {
    return this.letterService.getPublicLetters();
  }
}