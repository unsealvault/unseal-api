import { AuthService } from "./auth.service";
import { AuthResponse, LoginInput, SignUpInput } from "./dto/auth.dto";
import { User } from "../user/user.schema";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(input: SignUpInput, context: any): Promise<AuthResponse>;
    login(loginInput: LoginInput, context: any): Promise<AuthResponse>;
    getMe(user: User): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    private setAuthCookies;
}
