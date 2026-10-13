"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = require("@nestjs/mongoose");
const auth_resolver_1 = require("./auth.resolver");
const user_schema_1 = require("../user/user.schema");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: config_1.default.jwt_access_secret,
            }),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map