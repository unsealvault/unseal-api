import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateLetterInput {
  @Field()
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  recipientEmail!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  encryptedContent!: string;

  @Field()
  @Type(() => Date)
  @IsDate()
  deliverAt!: Date;

  @Field({ defaultValue: 'self' })
  @IsString()
  @IsIn(['self', 'someone_else'])
  @IsOptional()
  audience?: string;

  @Field({ defaultValue: 'private' })
  @IsString()
  @IsIn(['private', 'public_anonymous'])
  @IsOptional()
  visibility?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  authorName?: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsOptional()
  mediaUrls?: string[];
}

@ObjectType()
export class LetterType {
  @Field(() => ID)
  id!: string;

  @Field()
  recipientEmail!: string;

  @Field()
  encryptedContent!: string;

  @Field()
  status!: string;

  @Field()
  deliverAt!: Date;

  @Field()
  createdAt!: Date;
}