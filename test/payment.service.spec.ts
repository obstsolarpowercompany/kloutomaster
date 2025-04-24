import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../src/modules/payment/application/payment.service';
import { describe, expect, beforeEach, it } from '@jest/globals';


describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
