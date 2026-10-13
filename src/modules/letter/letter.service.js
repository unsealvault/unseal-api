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
exports.LetterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const letter_schema_1 = require("./letter.schema");
let LetterService = class LetterService {
    letterModel;
    constructor(letterModel) {
        this.letterModel = letterModel;
    }
    async sealLetter(input, clientIp) {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const count = await this.letterModel.countDocuments({
            ipAddress: clientIp,
            createdAt: { $gte: oneDayAgo },
        });
        if (count >= 3) {
            throw new common_1.NotFoundException('Daily limit reached (3/3 free capsules for today).');
        }
        return this.letterModel.create({
            ...input,
            ipAddress: clientIp,
            recipientEmail: input.recipientEmail.toLowerCase().trim(),
            userId: input.userId ? new mongoose_2.Types.ObjectId(input.userId) : undefined,
            status: 'sealed',
        });
    }
    async getMyLetters(userId, userEmail) {
        const query = {
            $or: [{ userId: new mongoose_2.Types.ObjectId(userId) }],
        };
        if (userEmail) {
            query.$or.push({ recipientEmail: userEmail.toLowerCase().trim() });
        }
        return this.letterModel.find(query).sort({ createdAt: -1 }).exec();
    }
    async findById(_id) {
        if (!mongoose_2.Types.ObjectId.isValid(_id)) {
            throw new common_1.NotFoundException("Invalid Letter ID format");
        }
        const result = await this.letterModel.findById(_id).exec();
        if (!result) {
            throw new common_1.NotFoundException("Letter not found in the vault");
        }
        return {
            ...result.toObject(),
            userId: result.userId?.toString(),
        };
    }
    async processDueLetters() {
        const now = new Date();
        const result = await this.letterModel.updateMany({
            status: "sealed",
            deliverAt: { $lte: now },
        }, {
            $set: { status: "delivered" },
        });
        return result.modifiedCount;
    }
    async getDueLetters() {
        const now = new Date();
        return this.letterModel
            .find({
            status: "sealed",
            deliverAt: { $lte: now },
        })
            .exec();
    }
    async markAsDelivered(id) {
        await this.letterModel
            .findByIdAndUpdate(id, { status: "delivered" })
            .exec();
    }
};
exports.LetterService = LetterService;
exports.LetterService = LetterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(letter_schema_1.Letter.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LetterService);
//# sourceMappingURL=letter.service.js.map