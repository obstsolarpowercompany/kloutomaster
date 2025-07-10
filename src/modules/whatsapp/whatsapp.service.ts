import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as twilio from "twilio";

@Injectable()
export class WhatsAppService {
  private client: twilio.Twilio;
  private logger = new Logger(WhatsAppService.name);

  constructor(private configService: ConfigService) {
    this.client = twilio(this.configService.get("TWILIO_ACCOUNT_SID"), this.configService.get("TWILIO_AUTH_TOKEN"));
  }

  async sendOTP(phoneNumber: string, otpCode: string): Promise<boolean> {
    try {
      // Format phone number (ensure it starts with + and country code)
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      console.log("This is the formatted phone number:", formattedPhone);
      console.log("This is the OTP code:", otpCode);
      console.log("This is the WhatsApp number:", this.configService.get("TWILIO_WHATSAPP_NUMBER"));

      const message = await this.client.messages.create({
        body: `Your verification code is: ${otpCode}. This code will expire in 5 minutes.`,
        from: this.configService.get("TWILIO_WHATSAPP_NUMBER"),
        to: `whatsapp:${formattedPhone}`,
      });

      this.logger.log(`WhatsApp OTP sent successfully. SID: ${message.sid}`);
      return true;
    } catch (error) {
      this.logger.error("WhatsApp OTP send error:", error);
      return false;
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, "");

    if (!cleaned.startsWith("234") && (cleaned.length === 10 || cleaned.length === 11)) {
      // For Nigerian numbers, add 234 country code
      cleaned = "234" + cleaned;
    }

    return "+" + cleaned;
  }
}
