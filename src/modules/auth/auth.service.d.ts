import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.schema";
import { Model } from "mongoose";
import { AuthResponse, LoginInput, SignUpInput } from "./dto/auth.dto";
export declare class AuthService {
    private userService;
    private userModel;
    private readonly jwtService;
    constructor(userService: UserService, userModel: Model<User>, jwtService: JwtService);
    signUp(input: SignUpInput): Promise<AuthResponse>;
    login(loginInput: LoginInput): Promise<{
        statusCode: StatusCodes;
        success: boolean;
        message: string;
        accessToken: string;
        refreshToken: string;
        user: import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getMe(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
