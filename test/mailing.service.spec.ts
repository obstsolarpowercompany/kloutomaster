import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from '../src/modules/mailing/application/mailing.service';
import { describe, expect, beforeEach, it } from '@jest/globals';


describe('MailingService', () => {
  let service: MailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailingService],
    }).compile();

    service = module.get<MailingService>(MailingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
