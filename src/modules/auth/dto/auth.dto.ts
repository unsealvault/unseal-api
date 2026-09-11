import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator'; 
import { User } from 'src/modules/user/user.schema';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty()
  password!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => Number)
  statusCode!: number;

  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => String)
  accessToken!: string;

  @Field(() => String)
  refreshToken!: string;

  @Field(() => User)
  user!: User;
}