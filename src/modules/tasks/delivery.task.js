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
var DeliveryTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const letter_service_1 = require("../letter/letter.service");
const mail_service_1 = require("../mail/mail.service");
let DeliveryTask = DeliveryTask_1 = class DeliveryTask {
    letterService;
    mailService;
    logger = new common_1.Logger(DeliveryTask_1.name);
    constructor(letterService, mailService) {
        this.letterService = letterService;
        this.mailService = mailService;
    }
    async handleCronDeliveries() {
        const dueLetters = await this.letterService.getDueLetters();
        if (dueLetters.length === 0) {
            return;
        }
        this.logger.log(`Processing unseal dispatch for ${dueLetters.length} capsules...`);
        for (const letter of dueLetters) {
            const emailSent = await this.mailService.sendUnsealNotification(letter.recipientEmail, letter._id.toString(), letter.createdAt || new Date());
            if (emailSent) {
                await this.letterService.markAsDelivered(letter._id.toString());
                this.logger.log(`Letter ${letter._id} marked as delivered.`);
            }
        }
    }
};
exports.DeliveryTask = DeliveryTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliveryTask.prototype, "handleCronDeliveries", null);
exports.DeliveryTask = DeliveryTask = DeliveryTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [letter_service_1.LetterService,
        mail_service_1.MailService])
], DeliveryTask);
//# sourceMappingURL=delivery.task.js.map