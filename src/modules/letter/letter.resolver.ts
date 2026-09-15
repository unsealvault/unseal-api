// src/letter/letter.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LetterService } from './letter.service';
import { CreateLetterInput, LetterType } from './dto/letter.input';
import { Letter } from './letter.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';
import { User } from '../user/user.schema';

@Resolver(() => LetterType)
export class LetterResolver {
  constructor(private readonly letterService: LetterService) {}

  @Query(() => [Letter], { name: 'myLetters' })
  @UseGuards(GqlAuthGuard)
  async getMyLetters(@CurrentUser() user: User): Promise<Letter[]> {

    return this.letterService.getMyLetters(
      user._id.toString(),
      (user as any).email,
    );
  }


  // Create / Seal Letter
@Mutation(() => Letter)
  async sealLetter(@Args('input') input: CreateLetterInput): Promise<Letter> {
    return this.letterService.sealLetter(input);
  }

  // ২. Unseal my Letter by id
  @Query(() => LetterType, { nullable: true })
  async getMyLetterById(
    @Args('_id') _id: string,
  ): Promise<LetterType> {
    // console.log("from resolver", _id)
    return this.letterService.findById(_id);
  }

  // ৩. Unsell Letter for Public Vault
  // @Query(() => [LetterType])
  // async publicVault(): Promise<LetterType[]> {
  //   return this.letterService.getPublicLetters();
  // }
}