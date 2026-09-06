// src/tasks/delivery.task.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LetterService } from '../letter/letter.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class DeliveryTask {
  private readonly logger = new Logger(DeliveryTask.name);

  constructor(
    private readonly letterService: LetterService,
    private readonly mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronDeliveries() {
    const dueLetters = await this.letterService.getDueLetters();

    if (dueLetters.length === 0) {
      return;
    }

    this.logger.log(`Processing unseal dispatch for ${dueLetters.length} capsules...`);

    for (const letter of dueLetters) {
      const emailSent = await this.mailService.sendUnsealNotification(
        letter.recipientEmail,
        letter._id.toString(),
        (letter as any).createdAt || new Date(),
      );

      if (emailSent) {
        await this.letterService.markAsDelivered(letter._id.toString());
        this.logger.log(`Letter ${letter._id} marked as delivered.`);
      }
    }
  }
}