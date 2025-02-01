import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import UserService from './user.service';
import { OTP } from './entities/otp.entity';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { UserProfile } from './entities/userProfile.entity';
import { MailingService } from '../mailing/mailing.service';
import { RefreshToken } from './entities/refreshToken.entity';

@Module({
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService, Repository, MailingService],
  imports: [TypeOrmModule.forFeature([User, UserProfile, OTP, RefreshToken])],
  exports: [UserService],
})
export class UserModule {}
