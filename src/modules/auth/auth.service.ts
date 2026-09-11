// auth.service.ts
import { 
  Injectable, 
  UnauthorizedException, 
  ConflictException, 
  InternalServerErrorException 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { LoginInput } from "./dto/login.input";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthResponse, SignUpInput } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: SignUpInput): Promise<AuthResponse> {
    const { email, password, name } = input;
    const normalizedEmail = email.toLowerCase().trim();

// Check user is exit...
    const existingUser = await this.userModel.findOne({
      email: normalizedEmail,
      isDeleted: false,
    });

    if (existingUser) {
      throw new ConflictException('This email is already registered.');
    }

    try {
      // password secured with bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const newUser = new this.userModel({
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim(),
      });

      const savedUser = await newUser.save();

      // Create token payload
      const payload = {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role,
      };

      // Access Token & Refresh Token (7d)
      const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      return {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered and authenticated successfully',
        accessToken,
        refreshToken,
        user: savedUser,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to register user.');
    }
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const normalizedEmail = email.toLowerCase().trim();

    // find user
    const user = await this.userModel.findOne({ 
      email: normalizedEmail,
      isDeleted: false 
    });

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
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }
}