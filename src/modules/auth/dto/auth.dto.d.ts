import { User } from "../../user/user.schema";
export declare class SignUpInput {
    email: string;
    password: string;
    name?: string;
}
export declare class AuthResponse {
    statusCode: number;
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}
export declare class LoginInput {
    email: string;
    password: string;
}
