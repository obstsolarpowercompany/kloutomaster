import { Module } from '@nestjs/common';
import RegistrationController from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';
import AuthenticationService from './auth.service';
import { User } from '../user/entities/user.entity';
import UserService from '../user/user.service';
import appConfig from '../../../config/auth.config';
import { MailingService } from '../mailing/mailing.service';
import { OTP } from '../user/entities/otp.entity';
import { BullModule } from '@nestjs/bull';
import { RefreshToken } from '../user/entities/refreshToken.entity';
import { Wallet } from '../wallet/entities/wallet.entity';

@Module({
  controllers: [RegistrationController],
  providers: [AuthenticationService, Repository, UserService, MailingService],
  imports: [
    TypeOrmModule.forFeature([User, OTP, RefreshToken, Wallet]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: `${appConfig().jwtExpiry}s` },
    }),
    BullModule.registerQueue({
      name: 'mailing',
    }),
  ],
})
export class AuthModule {}
