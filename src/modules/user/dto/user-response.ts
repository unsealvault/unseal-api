import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "../user.schema";

@ObjectType()
export class UserListResponse {
  @Field()
  statusCode!: number;

  @Field()
  success!: boolean;

  @Field()
  message?: string;

  @Field(() => [User], { nullable: true })
  data?: User[];
}

@ObjectType()
export class SingleUserResponse {
  @Field(() => Int)
  statusCode!: number;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => User, { nullable: true })
  data?: User;
}
