import { HttpStatus, Injectable } from '@nestjs/common';
import { Follower } from './entities/following.entity';
import { Like, Repository } from 'typeorm';
import { UserProfile } from '../user/entities/userProfile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from '../../helpers/custom-http-filter';
import {
  getUserIdByIdentifier,
  mapProfileToResponse,
} from '../user/utils/profile.utils';
import { isUUID } from 'class-validator';
import { User } from '../user/entities/user.entity';
import * as SYS_MSG from '../../constant/SystemMessages';

@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Follower) private followerRepo: Repository<Follower>,
    @InjectRepository(UserProfile)
    private userProfileRepo: Repository<UserProfile>,
  ) {}

  private static isFollowing = false;

  static setFollowingMode(isEnabled: boolean) {
    FollowingService.isFollowing = isEnabled;
  }

  static getFollowingMode() {
    return FollowingService.isFollowing;
  }

  private readonly API_KEY =
    process.env.SERVER_SECRET || 'this-is-the-key-for-doing-crazy-things';

  validateKey(providedKey: string) {
    if (providedKey !== this.API_KEY) {
      throw new CustomHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async followUser(followerId: string, username: string) {
    const followee = await this.userProfileRepo.findOne({
      where: {
        username: username,
      },
      relations: ['user'],
    });

    if (!followee) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User'),
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the user is trying to follow themselves
    if (followerId === followee.user.id) {
      throw new CustomHttpException(
        SYS_MSG.FOLLOW_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the follow relationship already exists
    const existingFollow = await this.followerRepo.findOne({
      where: {
        follower: { id: followerId },
        followee: { id: followee.user.id },
      },
    });

    if (existingFollow) {
      throw new CustomHttpException(
        SYS_MSG.ALREADY_FOLLOWED,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Add the new follow relationship
    const follow = this.followerRepo.create({
      follower: { id: followerId },
      followee: { id: followee.user.id },
    });
    console.log(follow);

    await this.followerRepo.save(follow);

    await this.userProfileRepo.increment(
      { user: { id: followee.user.id } },
      'number_of_followers',
      1,
    );
    await this.userProfileRepo.increment(
      { user: { id: followerId } },
      'number_of_following',
      1,
    );

    // Return the detailed follower and followee information
    const followerProfile = await this.userProfileRepo.findOne({
      where: { user: { id: followerId } },
      // select: ['first_name', 'last_name', 'avatar_url', 'username'],
    });
    const selectedFollowerProfile = {
      first_name: followerProfile?.first_name,
      last_name: followerProfile?.last_name,
      avatar_url: followerProfile?.avatar_url,
      username: followerProfile?.username,
    };

    const followeeProfile = await this.userProfileRepo.findOne({
      where: { user: { id: followee.user.id } },
    });
    const selectedFolloweeProfile = {
      first_name: followeeProfile?.first_name,
      last_name: followeeProfile?.last_name,
      avatar_url: followeeProfile?.avatar_url,
      username: followeeProfile?.username,
    };
    // console.log(followeeProfile);

    const responsePayload = {
      follower: mapProfileToResponse(selectedFollowerProfile),
      followingProfile: mapProfileToResponse(selectedFolloweeProfile),
      id: follow.id,
      followedAt: follow.followedAt,
    };

    return {
      message: 'You are now following this user',
      data: responsePayload,
    };
  }

  async getterRoute() {
    if (FollowingService.getFollowingMode()) {
      throw new CustomHttpException('Server', HttpStatus.SERVICE_UNAVAILABLE);
    }

    FollowingService.setFollowingMode(true);

    return { message: 'Following is running' };
  }

  restart() {
    FollowingService.setFollowingMode(false);
    console.log('Hitting it up');
    return { message: 'Following is running up' };
  }

  async unfollowUser(followerId: string, username: string) {
    const followeeProfile = await this.userProfileRepo.findOne({
      where: {
        username: username,
      },
      relations: ['user'],
    });

    // Check if the follow relationship exists
    const existingFollow = await this.followerRepo.findOne({
      where: {
        follower: { id: followerId },
        followee: { id: followeeProfile.user.id },
      },
    });

    if (!existingFollow) {
      throw new Error('You are not following this user');
    }

    // Remove the follow relationship
    await this.followerRepo.remove(existingFollow);

    // Decrement the follower and following count for both users
    await this.userProfileRepo.decrement(
      { user: { id: followeeProfile.user.id } },
      'number_of_followers',
      1,
    );
    await this.userProfileRepo.decrement(
      { user: { id: followerId } },
      'number_of_following',
      1,
    );

    return { message: 'Unfollowed successfully' };
  }

  async getUserFollowers(
    identifier: string,
    query: { limit?: number; page?: number; filter?: string },
  ) {
    const userId = await getUserIdByIdentifier(
      identifier,
      this.userProfileRepo,
    );

    // Set pagination defaults and limits
    const limit = Math.min(query.limit || 20);
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // Set up filter conditions
    const filter = query.filter ? `%${query.filter}%` : null;

    // Fetch followers with pagination and filtering
    const [followers, count] = await this.followerRepo.findAndCount({
      where: {
        followee: { id: userId },
        ...(filter && {
          follower: {
            profile: [
              { first_name: Like(filter) },
              { last_name: Like(filter) },
              { username: Like(filter) },
            ],
          },
        }),
      },
      relations: ['follower', 'follower.profile'],
      take: limit,
      skip,
    });

    // Map results to return follower details
    const followerDetails = followers.map((follow) => ({
      id: follow.follower.id,
      first_name: follow.follower.profile.first_name,
      last_name: follow.follower.profile.last_name,
      username: follow.follower.profile.username,
      avatar_url: follow.follower.profile.avatar_url,
    }));

    return {
      message: 'Followers retrieved successfully',
      data: followerDetails,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getUserFollowing(
    identifier: string,
    query: { limit?: number; page?: number; filter?: string },
  ) {
    const userId = await getUserIdByIdentifier(
      identifier,
      this.userProfileRepo,
    );

    // Set pagination defaults and limits
    const limit = Math.min(query.limit || 20);
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // Set up filter conditions
    const filter = query.filter ? `%${query.filter}%` : null;

    // Fetch following users with pagination and filtering
    const [following, count] = await this.followerRepo.findAndCount({
      where: {
        follower: { id: userId },
        ...(filter && {
          followee: {
            profile: [
              { first_name: Like(filter) },
              { last_name: Like(filter) },
              { username: Like(filter) },
            ],
          },
        }),
      },
      relations: ['followee', 'followee.profile'],
      take: limit,
      skip,
    });

    // Map results to return followee details
    const followeeDetails = following.map((follow) => ({
      id: follow.followee.id,
      first_name: follow.followee.profile.first_name,
      last_name: follow.followee.profile.last_name,
      username: follow.followee.profile.username,
      avatar_url: follow.followee.profile.avatar_url,
    }));

    return {
      message: 'Following retrieved successfully',
      data: followeeDetails,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
