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
var MailingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
let MailingService = MailingService_1 = class MailingService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MailingService_1.name);
        this.generalTransporter = nodemailer.createTransport(smtpTransport({
            host: this.configService.get('server.smtp.generalHost'),
            port: this.configService.get('server.smtp.generalPort'),
            secure: this.configService.get('server.smtp.generalSecure'),
            auth: {
                user: this.configService.get('server.smtp.generalUser'),
                pass: this.configService.get('server.smtp.generalPassword'),
            },
        }));
        this.paymentTransporter = nodemailer.createTransport(smtpTransport({
            host: this.configService.get('server.smtp.paymentHost'),
            port: this.configService.get('server.smtp.paymentPort'),
            secure: this.configService.get('server.smtp.paymentSecure'),
            auth: {
                user: this.configService.get('server.smtp.paymentUser'),
                pass: this.configService.get('server.smtp.paymentPassword'),
            },
        }));
    }
    async sendMail(transporter, to, subject, template, context) {
        try {
            this.logger.log(`Sending email to: ${to}, subject: ${subject}`);
            const templatePath = path.join(__dirname, 'templates', `${template}.html`);
            const templateSource = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = handlebars.compile(templateSource);
            const html = compiledTemplate(context);
            await transporter.sendMail({
                from: '"Klouto" <noreply@klouto.ng>',
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent successfully to: ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to: ${to}`, error.stack);
            throw new Error('Failed to send email');
        }
    }
    async sendSignupEmail(to, first_name, otp) {
        const context = { first_name, otp };
        await this.sendMail(this.generalTransporter, to, 'Welcome to Klouto - Confirm Your Email', 'signup', context);
    }
    async sendLoginOtpEmail(to, first_name, otp) {
        const context = { first_name, otp };
        await this.sendMail(this.generalTransporter, to, 'Your Login OTP', 'login', context);
    }
    async sendPaymentEmail(to, first_name, amount) {
        const context = { first_name, amount };
        await this.sendMail(this.paymentTransporter, to, 'Payment Confirmation', 'payment', context);
    }
};
exports.MailingService = MailingService;
exports.MailingService = MailingService = MailingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailingService);
//# sourceMappingURL=mailing.service.js.map