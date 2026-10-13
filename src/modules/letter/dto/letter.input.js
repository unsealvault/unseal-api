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
exports.LetterType = exports.CreateLetterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
let CreateLetterInput = class CreateLetterInput {
    userId;
    recipientEmail;
    encryptedContent;
    deliverAt;
    audience;
    visibility;
    authorName;
    images;
    audio;
    videos;
    files;
    paymentId;
};
exports.CreateLetterInput = CreateLetterInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)({}, { message: "A valid email address is required" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "recipientEmail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "encryptedContent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateLetterInput.prototype, "deliverAt", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: "self" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["self", "someone_else"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "audience", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: "private" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["private", "public_anonymous"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "visibility", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "authorName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLetterInput.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLetterInput.prototype, "audio", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLetterInput.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLetterInput.prototype, "files", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLetterInput.prototype, "paymentId", void 0);
exports.CreateLetterInput = CreateLetterInput = __decorate([
    (0, graphql_1.InputType)()
], CreateLetterInput);
let LetterType = class LetterType {
    userId;
    recipientEmail;
    encryptedContent;
    status;
    deliverAt;
    audience;
    visibility;
    authorName;
    images;
    audio;
    videos;
    files;
    createdAt;
    paymentId;
};
exports.LetterType = LetterType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], LetterType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], LetterType.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LetterType.prototype, "recipientEmail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LetterType.prototype, "encryptedContent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LetterType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], LetterType.prototype, "deliverAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: 'self' }),
    __metadata("design:type", String)
], LetterType.prototype, "audience", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: 'private' }),
    __metadata("design:type", String)
], LetterType.prototype, "visibility", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, defaultValue: 'Anonymous' }),
    __metadata("design:type", String)
], LetterType.prototype, "authorName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    __metadata("design:type", Array)
], LetterType.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    __metadata("design:type", Array)
], LetterType.prototype, "audio", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    __metadata("design:type", Array)
], LetterType.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    __metadata("design:type", Array)
], LetterType.prototype, "files", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], LetterType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LetterType.prototype, "paymentId", void 0);
exports.LetterType = LetterType = __decorate([
    (0, graphql_1.ObjectType)()
], LetterType);
//# sourceMappingURL=letter.input.js.map