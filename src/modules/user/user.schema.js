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
exports.UserSchema = exports.User = exports.USER_ROLE = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const graphql_1 = require("@nestjs/graphql");
const user_constant_1 = require("./user.constant");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "USER";
    USER_ROLE["ADMIN"] = "ADMIN";
})(USER_ROLE || (exports.USER_ROLE = USER_ROLE = {}));
let User = class User extends mongoose_2.Document {
    name;
    email;
    password;
    role;
    profilePhoto;
    status;
    isDeleted;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: String, default: USER_ROLE.USER, enum: USER_ROLE }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, mongoose_1.Prop)({
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }),
    __metadata("design:type", String)
], User.prototype, "profilePhoto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ default: user_constant_1.STATUS.Active, enum: user_constant_1.STATUS }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map