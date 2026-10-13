export declare class MailService {
    private readonly logger;
    private resend;
    constructor();
    sendUnsealNotification(recipientEmail: string, letterId: string, createdAt: Date): Promise<boolean>;
}
