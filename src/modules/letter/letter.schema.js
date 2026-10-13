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
exports.LetterSchema = exports.Letter = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Letter = class Letter {
    userId;
    recipientEmail;
    encryptedContent;
    deliverAt;
    audience;
    visibility;
    authorName;
    status;
    images = [];
    audio = [];
    videos = [];
    files = [];
    createdAt;
    updatedAt;
    paymentId;
    ipAddress;
};
exports.Letter = Letter;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Letter.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: false, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Letter.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Letter.prototype, "recipientEmail", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Letter.prototype, "encryptedContent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Letter.prototype, "deliverAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: "self" }),
    (0, mongoose_1.Prop)({ default: "self", enum: ["self", "someone_else"] }),
    __metadata("design:type", String)
], Letter.prototype, "audience", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: "private" }),
    (0, mongoose_1.Prop)({ default: "private", enum: ["private", "public_anonymous"] }),
    __metadata("design:type", String)
], Letter.prototype, "visibility", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, defaultValue: "Anonymous" }),
    (0, mongoose_1.Prop)({ default: "Anonymous", trim: true }),
    __metadata("design:type", String)
], Letter.prototype, "authorName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: "sealed" }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: ["sealed", "delivered"],
        default: "sealed",
    }),
    __metadata("design:type", String)
], Letter.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Letter.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Letter.prototype, "audio", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Letter.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Letter.prototype, "files", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Letter.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Letter.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Letter.prototype, "paymentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Letter.prototype, "ipAddress", void 0);
exports.Letter = Letter = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({ timestamps: true })
], Letter);
exports.LetterSchema = mongoose_1.SchemaFactory.createForClass(Letter);
//# sourceMappingURL=letter.schema.js.map