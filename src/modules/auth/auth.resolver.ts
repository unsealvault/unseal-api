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

    // console.log('login result...', result.accessToken)

    // কুকি সেট
    this.setAuthCookies(context, result.accessToken, result.refreshToken);

    return result;
  }

  // ME QUERY
  @Query(() => User, { name: "me" })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User) {
    console.log('getMe user... from auth resolver', user);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const result = await this.authService.getMe(user._id.toString());
    console.log('getMe result... from auth resolver', result);
    return result;
  }

  private setAuthCookies(context: any, accessToken: string, refreshToken: string) {
    if (!context?.res?.cookie) return;

    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // লাইভ সার্ভারে (HTTPS) true হবে
      sameSite: 'lax' as const,
      path: "/",
      // ...(isProduction && { domain: '.unsealme.com' }),
    };

    // Access Token (15 মিনিট)
    context.res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    // Refresh Token (7 দিন)
    context.res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}