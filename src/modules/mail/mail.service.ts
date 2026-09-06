// src/mail/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendUnsealNotification(
    recipientEmail: string,
    letterId: string,
    createdAt: Date,
  ): Promise<boolean> {
    const unsealUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/unseal/${letterId}`;

    try {
      await this.resend.emails.send({
        from: 'Unseal <onboarding@resend.dev>', // কাস্টম ডোমেইন ভেরিফাই না করা পর্যন্ত এটি টেস্ট অ্যাড্রেস হিসেবে কাজ করে
        to: recipientEmail,
        subject: 'A memory from your past has unlocked 📜',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background-color: #0b0c0e; color: #ededed; border-radius: 12px; border: 1px solid #222;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #991b1b; font-weight: 600;">Unseal Protocol</span>
              <h1 style="font-size: 22px; font-weight: 500; margin-top: 8px; color: #ffffff;">The Time Lock Has Expired</h1>
              <p style="font-size: 13px; color: #888; margin-top: 4px;">Sealed on ${new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <div style="background-color: #141619; border: 1px solid #26292e; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #ccc; line-height: 1.6; margin: 0 0 16px 0;">
                A time capsule designated for this address is now ready to be opened. The contents remain client-side encrypted and can only be decrypted in your browser.
              </p>
              <a href="${unsealUrl}" style="display: inline-block; background-color: #991b1b; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 500; padding: 10px 24px; border-radius: 6px; letter-spacing: 0.05em; text-transform: uppercase;">
                Unseal Capsule
              </a>
            </div>

            <p style="font-size: 11px; text-align: center; color: #555; margin: 0;">
              Zero-Knowledge Architecture · Direct End-to-End Cryptography
            </p>
          </div>
        `,
      });

      this.logger.log(`Dispatch notification sent successfully to ${recipientEmail}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send unseal email to ${recipientEmail}`, error);
      return false;
    }
  }
}