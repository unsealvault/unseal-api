// auth.resolver.ts
import { Resolver, Mutation, Args, Context, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { AuthResponse, SignUpInput } from "./dto/auth.dto";
import { CurrentUser } from "./currentUser.decorator";
import { User } from "../user/user.schema";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./auth.guard";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  // SIGN UP
  @Mutation(() => AuthResponse)
  async signUp(@Args('input') input: SignUpInput, @Context() context: any,): Promise<AuthResponse> {
    const result = await this.authService.signUp(input);

    this.setAuthCookies(context, result.accessToken, result.refreshToken);

    return result;
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Args("loginInput") loginInput: LoginInput, @Context() context: any,): Promise<AuthResponse> {
    const result = await this.authService.login(loginInput);

    // কুকি সেট
    this.setAuthCookies(context, result.accessToken, result.refreshToken);

    return result;
  }

  // ME QUERY
  @Query(() => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User) {    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return this.authService.getMe(user._id.toString());
  }

  // কুকি সেট করার কমন হেল্পার
  private setAuthCookies(context: any, accessToken: string, refreshToken: string) {
    if (!context?.res?.cookie) return;

    // Access Token (15 মিনিট)
    context.res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Refresh Token (7 দিন)
    context.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}