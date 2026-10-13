import { LetterService } from '../letter/letter.service';
import { MailService } from '../mail/mail.service';
export declare class DeliveryTask {
    private readonly letterService;
    private readonly mailService;
    private readonly logger;
    constructor(letterService: LetterService, mailService: MailService);
    handleCronDeliveries(): Promise<void>;
}
