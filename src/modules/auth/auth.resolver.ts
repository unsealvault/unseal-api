import { Resolver, Mutation, Args, Context, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { AuthResponse } from "./dto/auth-response";
import { CurrentUser } from "./currentUser.decorator";
import { User } from "../user/user.schema";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./auth.guard";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() context: any,
  ) {
    const result = await this.authService.login(loginInput);

    // ACCESS TOKEN
    context.res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    // REFRESH TOKEN
    context.res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: {
        user: result.user,
      },
    };
  }

  // ME


  @Query(() => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User) {
    // console.log("Current user in resolver:", user);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return this.authService.getMe(user._id.toString());
  }
}