import { Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }



}