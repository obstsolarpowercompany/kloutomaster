import { ConfigService } from '@nestjs/config';
export declare class MailingService {
    private readonly configService;
    private readonly logger;
    private generalTransporter;
    private paymentTransporter;
    constructor(configService: ConfigService);
    private sendMail;
    sendSignupEmail(to: string, first_name: string, otp: string): Promise<void>;
    sendLoginOtpEmail(to: string, first_name: string, otp: string): Promise<void>;
    sendPaymentEmail(to: string, first_name: string, amount: string): Promise<void>;
}
