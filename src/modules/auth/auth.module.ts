import { Module } from '@nestjs/common';
import RegistrationController from './infrastructure/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';
import AuthenticationService from './application/auth.service';
import { User } from '../user/domain/entities/user.entity';
import UserService from '../user/application/user.service';
import appConfig from '../../config/auth.config';
import { MailingService } from '../mailing/application/mailing.service';
import { OTP } from '../user/domain/entities/otp.entity';
import { BullModule } from '@nestjs/bull';
import { RefreshToken } from '../user/domain/entities/refreshToken.entity';
import { Wallet } from '../wallet/domain/entities/wallet.entity';

@Module({
  controllers: [RegistrationController],
  providers: [AuthenticationService, Repository, UserService, MailingService],
  imports: [
    TypeOrmModule.forFeature([User, OTP, RefreshToken, Wallet]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: `${appConfig().jwtExpiry}s` },
    }),
    BullModule.registerQueue({
      name: 'mailing',
    }),
  ],
  exports: [
    JwtModule,
    PassportModule,
  ]
})
export class AuthModule { }
