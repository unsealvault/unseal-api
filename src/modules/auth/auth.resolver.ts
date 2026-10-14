// auth.resolver.ts
import { Resolver, Mutation, Args, Context, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse, LoginInput, SignUpInput } from "./dto/auth.dto";
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

    console.log('login result...', result.accessToken)

    // কুকি সেট
    this.setAuthCookies(context, result.accessToken, result.refreshToken);

    return result;
  }

  // ME QUERY
  @Query(() => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User) {
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return this.authService.getMe(user._id.toString());
  }

  // কুকি সেট করার কমন হেল্পার (আপডেট করা হয়েছে)
  private setAuthCookies(context: any, accessToken: string, refreshToken: string) {
    if (!context?.res?.cookie) return;

    // চেক করা হচ্ছে আমরা প্রোডাকশনে আছি কিনা
    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // প্রোডাকশনে true (HTTPS), লোকালে false (HTTP)
      sameSite: isProduction ? ('none' as const) : ('lax' as const), // প্রোডাকশনে 'none', লোকালে 'lax'
      domain: isProduction ? '.unsealme.com' : undefined, // সাবডোমেইন শেয়ারের জন্য
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
    };

    // Access Token
    context.res.cookie("accessToken", accessToken, cookieOptions);

    // Refresh Token
    context.res.cookie("refreshToken", refreshToken, cookieOptions);
  }
}