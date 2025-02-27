import { Module } from '@nestjs/common';
import { PaymentService } from './application/payment.service';
import { PaymentController } from './infrastructure/controllers/payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
