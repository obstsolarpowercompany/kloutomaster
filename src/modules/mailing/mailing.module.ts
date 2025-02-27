import { Module } from '@nestjs/common';
import { MailingService } from './application/mailing.service';
import { MailingController } from './infrastructure/controllers/mailing.controller';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from 'src/config/server.config';

@Module({
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule { }
