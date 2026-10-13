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
exports.StorageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const storage_service_1 = require("./storage.service");
let PresignedUrlResponse = class PresignedUrlResponse {
    uploadUrl;
    publicUrl;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PresignedUrlResponse.prototype, "uploadUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PresignedUrlResponse.prototype, "publicUrl", void 0);
PresignedUrlResponse = __decorate([
    (0, graphql_1.ObjectType)()
], PresignedUrlResponse);
let StorageResolver = class StorageResolver {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async getPresignedUrl(filename, contentType) {
        return this.storageService.getPresignedUploadUrl(filename, contentType);
    }
};
exports.StorageResolver = StorageResolver;
__decorate([
    (0, graphql_1.Mutation)(() => PresignedUrlResponse),
    __param(0, (0, graphql_1.Args)('filename')),
    __param(1, (0, graphql_1.Args)('contentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StorageResolver.prototype, "getPresignedUrl", null);
exports.StorageResolver = StorageResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageResolver);
//# sourceMappingURL=storage.resolver.js.map