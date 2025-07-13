import { Injectable, Logger } from "@nestjs/common";
import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import * as bcrypt from "bcrypt";
@Injectable()
export class TwoFactorService {
  private readonly logger = new Logger(TwoFactorService.name);
  private readonly appName: string;
  private readonly issuer: string;

  constructor() {
    this.appName = "Klouto Socials";
    this.issuer = "Klouto LTD";
  }

  /**
   * Generate a new 2FA secret and QR code for user setup
   */
  async generateTwoFactorSecret(userIdentifier: string): Promise<{
    secret: string;
    qrCode: string;
    manualEntryKey: string;
  }> {
    try {
      // Generate a new secret
      const secret = speakeasy.generateSecret({
        name: `${this.appName} (${userIdentifier})`,
        issuer: this.issuer,
        length: 32,
      });

      // Generate QR code as base64 image
      const qrCodeUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: `${this.appName}:${userIdentifier}`,
        issuer: this.issuer,
        algorithm: "sha1",
        digits: 6,
        period: 30,
      });

      const qrCodeImage = await QRCode.toDataURL(qrCodeUrl, {
        width: 256,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      this.logger.log(`2FA secret generated for user: ${userIdentifier}`);

      return {
        secret: secret.base32,
        qrCode: qrCodeImage,
        manualEntryKey: secret.base32,
      };
    } catch (error) {
      this.logger.error("Error generating 2FA secret:", error);
      throw new Error("Failed to generate 2FA secret");
    }
  }

  /**
   * Verify a TOTP token against a secret
   */
  verifyTwoFactorToken(token: string, secret: string): boolean {
    try {
      // Remove any spaces or hyphens from token
      const cleanToken = token.replace(/[\s-]/g, "");

      // Verify the token
      const verified = speakeasy.totp.verify({
        secret: secret,
        token: cleanToken,
        window: 1,
        algorithm: "sha1",
        digits: 6,
        step: 30,
      });

      this.logger.log(`2FA token verification result: ${verified}`);
      return verified;
    } catch (error) {
      this.logger.error("Error verifying 2FA token:", error);
      return false;
    }
  }

  /**
   * Generate current TOTP token for testing purposes
   * Note: This should only be used for testing/development
   */
  generateCurrentToken(secret: string): string {
    return speakeasy.totp({
      secret: secret,
      algorithm: "sha1",
      digits: 6,
      step: 30,
    });
  }

  /**
   * Generate backup codes for 2FA recovery
   */
  generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];

    for (let i = 0; i < count; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }

    return codes;
  }

  /**
   * Hash backup codes for secure storage
   */
  async hashBackupCodes(codes: string[]): Promise<string[]> {
    const saltRounds = 12;

    const hashedCodes = await Promise.all(codes.map((code) => bcrypt.hash(code, saltRounds)));

    return hashedCodes;
  }

  /**
   * Verify backup code against hashed codes
   */
  async verifyBackupCode(inputCode: string, hashedCodes: string[]): Promise<{ valid: boolean; usedIndex?: number }> {
    for (let i = 0; i < hashedCodes.length; i++) {
      const isMatch = await bcrypt.compare(inputCode.toUpperCase(), hashedCodes[i]);
      if (isMatch) {
        return { valid: true, usedIndex: i };
      }
    }

    return { valid: false };
  }

  /**
   * Remove used backup code from array
   */
  removeUsedBackupCode(hashedCodes: string[], usedIndex: number): string[] {
    return hashedCodes.filter((_, index) => index !== usedIndex);
  }

  /**
   * Validate 2FA token format
   */
  isValidTokenFormat(token: string): boolean {
    // Remove spaces and hyphens
    const cleanToken = token.replace(/[\s-]/g, "");

    // Check if it's exactly 6 digits
    return /^\d{6}$/.test(cleanToken);
  }

  /**
   * Check if secret is valid base32 format
   */
  isValidSecret(secret: string): boolean {
    try {
      // Base32 alphabet
      const base32Regex = /^[A-Z2-7]+$/;
      return base32Regex.test(secret) && secret.length >= 16;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate QR code from existing secret (for re-display)
   */
  async generateQRCodeFromSecret(secret: string, userIdentifier: string): Promise<string> {
    try {
      const qrCodeUrl = speakeasy.otpauthURL({
        secret: secret,
        label: `${this.appName}:${userIdentifier}`,
        issuer: this.issuer,
        algorithm: "sha1",
        digits: 6,
        period: 30,
      });

      const qrCodeImage = await QRCode.toDataURL(qrCodeUrl, {
        width: 256,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      return qrCodeImage;
    } catch (error) {
      this.logger.error("Error generating QR code from secret:", error);
      throw new Error("Failed to generate QR code");
    }
  }
}
