"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const currentUser_decorator_1 = require("./currentUser.decorator");
const user_schema_1 = require("../user/user.schema");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(input, context) {
        const result = await this.authService.signUp(input);
        this.setAuthCookies(context, result.accessToken, result.refreshToken);
        return result;
    }
    async login(loginInput, context) {
        const result = await this.authService.login(loginInput);
        this.setAuthCookies(context, result.accessToken, result.refreshToken);
        return result;
    }
    async getMe(user) {
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return this.authService.getMe(user._id.toString());
    }
    setAuthCookies(context, accessToken, refreshToken) {
        if (!context?.res?.cookie)
            return;
        context.res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        context.res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => auth_dto_1.AuthResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_dto_1.AuthResponse),
    __param(0, (0, graphql_1.Args)("loginInput")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(() => user_schema_1.User, { name: "me" }),
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getMe", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map