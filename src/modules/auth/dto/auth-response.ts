import { ObjectType, Field } from "@nestjs/graphql";
import { GraphQLJSON } from "graphql-type-json";
import { User } from "src/modules/user/user.schema";

@ObjectType()
class LoginData {
  @Field()
  accessToken!: string;

  @Field(() => User)
  user!: User;
}

@ObjectType()
export class AuthResponse {
  @Field()
  statusCode!: number;

  @Field()
  success!: boolean;

  @Field()
  message?: string;

  @Field(() => LoginData, { nullable: true })
  data?: LoginData;
}
