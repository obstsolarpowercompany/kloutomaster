import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { AppService } from './application/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ExampleModule {}
