import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);

  private generalTransporter;
  private paymentTransporter;

  constructor(private readonly configService: ConfigService) {
    // Set up the general transporter for security-related emails (e.g., signup and login OTP)
    this.generalTransporter = nodemailer.createTransport(
      smtpTransport({
        host: this.configService.get<string>('server.smtp.generalHost'),
        port: this.configService.get<number>('server.smtp.generalPort'),
        secure: this.configService.get<boolean>('server.smtp.generalSecure'),
        auth: {
          user: this.configService.get<string>('server.smtp.generalUser'),
          pass: this.configService.get<string>('server.smtp.generalPassword'),
        },
      }),
    );

    // Set up the payment transporter for payment-related emails
    this.paymentTransporter = nodemailer.createTransport(
      smtpTransport({
        host: this.configService.get<string>('server.smtp.paymentHost'),
        port: this.configService.get<number>('server.smtp.paymentPort'),
        secure: this.configService.get<boolean>('server.smtp.paymentSecure'),
        auth: {
          user: this.configService.get<string>('server.smtp.paymentUser'),
          pass: this.configService.get<string>('server.smtp.paymentPassword'),
        },
      }),
    );
  }

  // Generic sendMail function
  private async sendMail(
    transporter,
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      this.logger.log(`Sending email to: ${to}, subject: ${subject}`);

      // Load the HTML template from the file system
      const templatePath = path.join(
        __dirname,
        'templates',
        `${template}.html`,
      );
      const templateSource = fs.readFileSync(templatePath, 'utf8');

      // Compile the template using handlebars
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate(context);

      // Send the email
      await transporter.sendMail({
        from: '"Klouto" <noreply@klouto.ng>',
        to,
        subject,
        html, // Use the compiled HTML here
      });

      this.logger.log(`Email sent successfully to: ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to: ${to}`, error.stack);
      throw new Error('Failed to send email');
    }
  }

  // Send Signup Email with OTP
  async sendSignupEmail(
    to: string,
    first_name: string,
    otp: string,
  ): Promise<void> {
    const context = { first_name, otp };
    await this.sendMail(
      this.generalTransporter,
      to,
      'Welcome to Klouto - Confirm Your Email',
      'signup',
      context,
    );
  }

  // Send Login OTP Email
  async sendLoginOtpEmail(
    to: string,
    first_name: string,
    otp: string,
  ): Promise<void> {
    const context = { first_name, otp };
    await this.sendMail(
      this.generalTransporter,
      to,
      'Your Login OTP',
      'login',
      context,
    );
  }

  // Send Payment Confirmation Email
  async sendPaymentEmail(
    to: string,
    first_name: string,
    amount: string,
  ): Promise<void> {
    const context = { first_name, amount };
    await this.sendMail(
      this.paymentTransporter,
      to,
      'Payment Confirmation',
      'payment',
      context,
    );
  }
}
