"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = __importStar(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const user_schema_1 = require("../user/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    userService;
    userModel;
    jwtService;
    constructor(userService, userModel, jwtService) {
        this.userService = userService;
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(input) {
        const { email, password, name } = input;
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await this.userModel.findOne({
            email: normalizedEmail,
            isDeleted: false,
        });
        if (existingUser) {
            throw new common_1.ConflictException('This email is already registered.');
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new this.userModel({
                email: normalizedEmail,
                password: hashedPassword,
                name: name?.trim(),
            });
            const savedUser = await newUser.save();
            const payload = {
                _id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
                role: savedUser.role,
            };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
            return {
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                success: true,
                message: 'Account created successfully!',
                accessToken,
                refreshToken,
                user: savedUser,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to register user.');
        }
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.userModel.findOne({
            email: normalizedEmail,
            isDeleted: false
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Email or password is incorrect");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Email or password is incorrect");
        }
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: "7d",
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: "7d",
        });
        return {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "User logged in successfully",
            accessToken,
            refreshToken,
            user,
        };
    }
    async getMe(userId) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map