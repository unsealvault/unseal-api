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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.AuthResponse = exports.SignUpInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../user/user.schema");
let SignUpInput = class SignUpInput {
    email;
    password;
    name;
};
exports.SignUpInput = SignUpInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsEmail)({}, { message: 'A valid email address is required' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email cannot be empty' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password cannot be empty' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "name", void 0);
exports.SignUpInput = SignUpInput = __decorate([
    (0, graphql_1.InputType)()
], SignUpInput);
let AuthResponse = class AuthResponse {
    statusCode;
    success;
    message;
    accessToken;
    refreshToken;
    user;
};
exports.AuthResponse = AuthResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], AuthResponse.prototype, "statusCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], AuthResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AuthResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AuthResponse.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AuthResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], AuthResponse.prototype, "user", void 0);
exports.AuthResponse = AuthResponse = __decorate([
    (0, graphql_1.ObjectType)()
], AuthResponse);
let LoginInput = class LoginInput {
    email;
    password;
};
exports.LoginInput = LoginInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)({}, { message: 'A valid email address is required' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput = __decorate([
    (0, graphql_1.InputType)()
], LoginInput);
//# sourceMappingURL=auth.dto.js.map