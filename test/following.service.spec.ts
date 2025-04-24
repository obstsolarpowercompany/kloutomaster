import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, beforeEach, it } from '@jest/globals';
import { FollowingService } from '../src/modules/following/application/following.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserProfile } from '../src/modules/user/domain/entities/userProfile.entity';
import { Follower } from '../src/modules/following/domain/entities/following.entity';
import { CustomHttpException } from '../src/modules/main/infrastructure/custom-http-filter';
import * as SYS_MSG from '../src/modules/main/application/SystemMessages';
import { HttpStatus } from '@nestjs/common';
import {
  getUserIdByIdentifier,
  mapProfileToResponse,
} from '../src/modules/user/application/profile.utils';

jest.mock('../../user/utils/profile.utils', () => ({
  getUserIdByIdentifier: jest.fn(),
  mapProfileToResponse: jest.fn((profile) => ({
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username,
    avatar_url: profile.avatar_url,
  })),
}));

describe('FollowingService', () => {
  let service: FollowingService;
  let followerRepo: jest.Mocked<Partial<Repository<Follower>>>;
  let userProfileRepo: jest.Mocked<Partial<Repository<UserProfile>>>;
  let mockGetUserIdByIdentifier: jest.Mock;

  beforeEach(async () => {
    followerRepo = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    userProfileRepo = {
      findOne: jest.fn(),
      increment: jest.fn(),
      decrement: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowingService,
        {
          provide: getRepositoryToken(Follower),
          useValue: followerRepo,
        },
        {
          provide: getRepositoryToken(UserProfile),
          useValue: userProfileRepo,
        },
      ],
    }).compile();

    service = module.get<FollowingService>(FollowingService);
    mockGetUserIdByIdentifier = getUserIdByIdentifier as jest.Mock;
  });

  describe('followUser', () => {
    it('should follow a user successfully', async () => {
      const followerId = '1';
      const followeeUsername = 'testUser';

      // Mock user profiles
      const mockFollowee = { user: { id: '2', username: followeeUsername } };
      jest
        .spyOn(userProfileRepo, 'findOne')
        .mockResolvedValue(mockFollowee as any);

      // Mock no existing follow
      jest.spyOn(followerRepo, 'findOne').mockResolvedValue(null);

      // Mock create and save operations
      const mockFollow = {
        id: '1',
        follower: { id: '1' },
        followee: { id: '2' },
        followedAt: new Date(),
      };
      jest.spyOn(followerRepo, 'create').mockReturnValue(mockFollow as any);
      jest.spyOn(followerRepo, 'save').mockResolvedValue(mockFollow as any);

      // Mock increment operations
      jest.spyOn(userProfileRepo, 'increment').mockResolvedValue(undefined);

      const result = await service.followUser(followerId, followeeUsername);

      const mockFollowRes = {
        follower: mockFollow.follower,
        followee: mockFollow.followee,
        followedAt: mockFollow.followedAt,
      };

      expect(result).toEqual({
        message: 'You are now following this user',
        data: {
          follower: mapProfileToResponse(mockFollowRes),
          followingProfile: mapProfileToResponse(mockFollowRes),
          id: '1',
          followedAt: mockFollow.followedAt,
        },
      });
    });

    it('should throw an error if trying to follow themselves', async () => {
      const followerId = '1';
      const followeeUsername = 'testUser';

      // Mock user profiles
      const mockFollowee = { user: { id: '1', username: followeeUsername } };
      jest
        .spyOn(userProfileRepo, 'findOne')
        .mockResolvedValue(mockFollowee as any);

      await expect(
        service.followUser(followerId, followeeUsername),
      ).rejects.toThrow(
        new CustomHttpException(SYS_MSG.FOLLOW_FAILED, HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw an error if already following the user', async () => {
      const followerId = '1';
      const followeeUsername = 'testUser';

      // Mock user profiles
      const mockFollowee = { user: { id: '2', username: followeeUsername } };
      jest
        .spyOn(userProfileRepo, 'findOne')
        .mockResolvedValue(mockFollowee as any);

      // Mock existing follow
      const mockFollow = { follower: { id: '1' }, followee: { id: '2' } };
      jest.spyOn(followerRepo, 'findOne').mockResolvedValue(mockFollow as any);

      await expect(
        service.followUser(followerId, followeeUsername),
      ).rejects.toThrow(
        new CustomHttpException(
          SYS_MSG.ALREADY_FOLLOWED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('unfollowUser', () => {
    it('should unfollow a user successfully', async () => {
      const followerId = '1';
      const followeeUsername = 'testUser';

      // Mock user profiles
      const mockFollowee = { user: { id: '2', username: followeeUsername } };
      jest
        .spyOn(userProfileRepo, 'findOne')
        .mockResolvedValue(mockFollowee as any);

      // Mock existing follow
      const mockFollow = {
        id: '1',
        follower: { id: '1' },
        followee: { id: '2' },
      };
      jest.spyOn(followerRepo, 'findOne').mockResolvedValue(mockFollow as any);

      // Mock remove operation
      jest.spyOn(followerRepo, 'remove').mockResolvedValue(null);

      // Mock decrement operations
      jest.spyOn(userProfileRepo, 'decrement').mockResolvedValue(undefined);

      const result = await service.unfollowUser(followerId, followeeUsername);

      expect(result).toEqual({ message: 'Unfollowed successfully' });
    });

    it('should throw an error if user is not following the target user', async () => {
      const followerId = '1';
      const followeeUsername = 'testUser';

      // Mock user profiles
      const mockFollowee = { user: { id: '2', username: followeeUsername } };
      jest
        .spyOn(userProfileRepo, 'findOne')
        .mockResolvedValue(mockFollowee as any);

      // Mock non-existing follow
      jest.spyOn(followerRepo, 'findOne').mockResolvedValue(null);

      await expect(
        service.unfollowUser(followerId, followeeUsername),
      ).rejects.toThrowError(new Error('You are not following this user'));
    });
  });

  describe('getUserFollowers', () => {
    it('should retrieve followers successfully', async () => {
      const identifier = 'user-identifier';
      const mockUserId = '1';

      // Mock getUserIdByIdentifier to return the mock user ID
      mockGetUserIdByIdentifier.mockResolvedValue(mockUserId);

      const mockFollowers = [
        {
          follower: {
            id: '2',
            profile: {
              first_name: 'John',
              last_name: 'Doe',
              username: 'john_doe',
              avatar_url: 'url',
            },
          },
        },
      ];

      // Mock the followerRepo.find method
      followerRepo.find.mockResolvedValue(mockFollowers as any);

      const result = await service.getUserFollowers(identifier, {});

      expect(result).toEqual({
        message: 'Followers retrieved successfully',
        data: [
          {
            id: '2',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
            avatar_url: 'url',
          },
        ],
      });

      // Check that the mocked function was called
      expect(getUserIdByIdentifier).toHaveBeenCalledWith(
        identifier,
        expect.anything(),
      );
      expect(followerRepo.find).toHaveBeenCalledWith({
        where: { followee: { id: mockUserId } },
        relations: ['follower', 'follower.profile'],
      });
    });
  });

  it('should retrieve following users successfully', async () => {
    // Mock the getUserIdByIdentifier function to return a user ID
    (getUserIdByIdentifier as jest.Mock).mockResolvedValue('1');

    // Mock follower data returned by followerRepo.find
    const mockFollowees = [
      {
        followee: {
          id: '2',
          profile: {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            avatar_url: 'http://example.com/avatar.jpg',
          },
        },
      },
      {
        followee: {
          id: '3',
          profile: {
            first_name: 'Jane',
            last_name: 'Smith',
            username: 'janesmith',
            avatar_url: 'http://example.com/avatar2.jpg',
          },
        },
      },
    ];
    jest.spyOn(followerRepo, 'find').mockResolvedValue(mockFollowees as any);

    const result = await service.getUserFollowing('testIdentifier', {});

    expect(result).toEqual({
      message: 'Following retrieved successfully',
      data: [
        {
          id: '2',
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          avatar_url: 'http://example.com/avatar.jpg',
        },
        {
          id: '3',
          first_name: 'Jane',
          last_name: 'Smith',
          username: 'janesmith',
          avatar_url: 'http://example.com/avatar2.jpg',
        },
      ],
    });
    expect(getUserIdByIdentifier).toHaveBeenCalledWith(
      'testIdentifier',
      expect.any(Object),
    );
    expect(followerRepo.find).toHaveBeenCalledWith({
      where: { follower: { id: '1' } },
      relations: ['followee', 'followee.profile'],
    });
  });
});
