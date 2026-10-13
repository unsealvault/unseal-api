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
exports.LetterResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const letter_service_1 = require("./letter.service");
const letter_input_1 = require("./dto/letter.input");
const letter_schema_1 = require("./letter.schema");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const currentUser_decorator_1 = require("../auth/currentUser.decorator");
const user_schema_1 = require("../user/user.schema");
let LetterResolver = class LetterResolver {
    letterService;
    constructor(letterService) {
        this.letterService = letterService;
    }
    async getMyLetters(user) {
        return this.letterService.getMyLetters(user._id.toString(), user.email);
    }
    sealLetter(input, context) {
        const req = context.req;
        const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip ||
            req.socket?.remoteAddress ||
            "127.0.0.1";
        return this.letterService.sealLetter(input, clientIp);
    }
    async getMyLetterById(_id) {
        return this.letterService.findById(_id);
    }
};
exports.LetterResolver = LetterResolver;
__decorate([
    (0, graphql_1.Query)(() => [letter_schema_1.Letter], { name: "myLetters" }),
    (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], LetterResolver.prototype, "getMyLetters", null);
__decorate([
    (0, graphql_1.Mutation)(() => letter_schema_1.Letter),
    __param(0, (0, graphql_1.Args)("input")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [letter_input_1.CreateLetterInput, Object]),
    __metadata("design:returntype", Promise)
], LetterResolver.prototype, "sealLetter", null);
__decorate([
    (0, graphql_1.Query)(() => letter_input_1.LetterType, { nullable: true }),
    __param(0, (0, graphql_1.Args)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LetterResolver.prototype, "getMyLetterById", null);
exports.LetterResolver = LetterResolver = __decorate([
    (0, graphql_1.Resolver)(() => letter_input_1.LetterType),
    __metadata("design:paramtypes", [letter_service_1.LetterService])
], LetterResolver);
//# sourceMappingURL=letter.resolver.js.map