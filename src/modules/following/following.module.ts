import { Module } from '@nestjs/common';
import { FollowingService } from './application/following.service';
import { FollowingController } from './infrastructure/controllers/following.controller';
import { Follower } from './domain/entities/following.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../user/domain/entities/userProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower, UserProfile])],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule { }
