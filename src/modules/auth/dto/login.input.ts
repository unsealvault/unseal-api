// login.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}


export class RegisterInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @Field()
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}