import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/controllers/user.controller';
import UserService from './application/user.service';
import { OTP } from './domain/entities/otp.entity';
import { ProfileController } from './infrastructure/controllers/profile.controller';
import { ProfileService } from './application/profile.service';
import { UserProfile } from './domain/entities/userProfile.entity';
import { MailingService } from '../mailing/application/mailing.service';
import { RefreshToken } from './domain/entities/refreshToken.entity';

@Module({
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService, Repository, MailingService],
  imports: [TypeOrmModule.forFeature([User, UserProfile, OTP, RefreshToken])],
  exports: [UserService],
})
export class UserModule { }
