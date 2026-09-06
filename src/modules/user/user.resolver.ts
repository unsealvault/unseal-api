import { Resolver, Query, Mutation, Args, ID, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.schema";
import { CreateUserInput } from "./dto/create-user.input";
import { StatusCodes } from "http-status-codes";
import { SingleUserResponse, UserListResponse } from "./dto/user-response";
import { GqlAuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  // @Mutation(() => User, { name: "registerUser" })
  // async createUser(@Args("input") createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }

  @Mutation(() => SingleUserResponse)
  async registerUser(@Args("input") createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput);
    return {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User registered successfully",
      data: user,
    };
  }

  // get all users
  @Query(() => UserListResponse, { name: "getAllUsers" })
  async getUsers() {
    const user = await this.userService.getUsers();

    return {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieved successfully",
      data: user,
    };
  }

  // get user by id
  @Query(() => SingleUserResponse, { name: "getUserById" })
  async getUser(@Args("id", { type: () => ID }) id: string) {
    const result = await this.userService.findOne(id);
    return {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single User retrieved successfully",
      data: result,
    };
  }



  // update mutation
  @Mutation(() => User)
  async updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("name", { nullable: true }) name?: string,
    @Args("email", { nullable: true }) email?: string,
  ) {
    return this.userService.update(id, { name, email });
  }

  // update mutation with response
  @Mutation(() => SingleUserResponse)
  async updateUserWithResponse(
    @Args("id", { type: () => ID }) id: string,
    @Args("name", { nullable: true }) name?: string,
    @Args("email", { nullable: true }) email?: string,
  ) {
    const updatedUser = await this.userService.update(id, { name, email });
    return {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    };
  }

  // delete mutation
  @Mutation(() => SingleUserResponse)
  async deleteUser(@Args("id", { type: () => ID }) id: string) {
    await this.userService.delete(id);
    return {
      statusCode: StatusCodes.OK, // এটি অটোমেটিক 200 বসিয়ে দেবে
      success: true,
      message: "User deleted successfully",
    };
  }
}
