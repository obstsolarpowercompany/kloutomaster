import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailingService } from '../../application/mailing.service';


@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) { }

}
