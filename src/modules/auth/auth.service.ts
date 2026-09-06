import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { LoginInput } from "./dto/login.input";
import { StatusCodes } from "http-status-codes";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;

    // find user
    const user = await this.userService.findUserByEmailForAuth(email);
    if (!user) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    // payload
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      profileUpdateStatus: user.profileUpdateStatus,
    };

    // tokens
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
    });

    return {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
      user,
    };
  }


async getMe(userId: string) {
  // console.log("userId:", userId);

  const user = await this.userService.findUserById(userId);

  // console.log("user:...", user);

  if (!user) {
    throw new UnauthorizedException("User not found");
  }

  return user;
}
}