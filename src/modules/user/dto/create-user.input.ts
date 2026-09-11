// create-user.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength, IsOptional, Matches } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @Field()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email!: string;

  @Field()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;

  // @Field({ nullable: true })
  // @Matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/, {
  //   message: "Please provide a valid Bangladeshi mobile number",
  // })
  // @IsOptional()
  // mobileNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  role?: string;
}
