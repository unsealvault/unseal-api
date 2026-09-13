import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';
import { User } from 'src/modules/user/user.schema';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email!: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => Int)
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