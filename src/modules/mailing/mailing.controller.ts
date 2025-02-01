import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailingService } from './mailing.service';


@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

}
