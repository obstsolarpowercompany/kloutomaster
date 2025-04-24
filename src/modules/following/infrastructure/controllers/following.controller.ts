import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  Headers,
} from '@nestjs/common';
import { FollowingService } from '../../application/following.service';
import {
  FollowUserDocs,
  GetAuthenticatedUserFollowersDocs,
  GetAuthenticatedUserFollowingDocs,
  GetFollowersByIdentifierDocs,
  GetFollowingByIdentifierDocs,
  UnfollowUserDocs,
} from '../docs/following-swagger.doc';
import { skipAuth } from 'src/helpers/skipAuth';

@Controller('follower')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) { }

  @FollowUserDocs()
  @Post('/:username/follow')
  create(@Req() req, @Param('username') username: string) {
    const followerId = req['user'].id;
    return this.followingService.followUser(followerId, username);
  }

  @UnfollowUserDocs()
  @Delete('/:username/unfollow')
  unfollowUser(@Req() req, @Param('username') username: string) {
    const followeId = req['user'].id;
    return this.followingService.unfollowUser(followeId, username);
  }

  @GetAuthenticatedUserFollowersDocs()
  @Get('/followers')
  async getAuthenticatedFollowers(@Req() req, @Query() query) {
    const identifier = req['user'].id;
    return await this.followingService.getUserFollowers(identifier, query);
  }

  @GetAuthenticatedUserFollowingDocs()
  @Get('/following')
  async getAuthenticatedFollowing(@Req() req, @Query() query) {
    const identifier = req['user'].id;
    return await this.followingService.getUserFollowing(identifier, query);
  }

  @GetFollowersByIdentifierDocs()
  @Get(':identifier/followers')
  async getFollowers(@Param('identifier') identifier: string, @Query() query) {
    return await this.followingService.getUserFollowers(identifier, query);
  }

  @GetFollowingByIdentifierDocs()
  @Get(':identifier/following')
  async getFollowing(@Param('identifier') identifier: string, @Query() query) {
    return await this.followingService.getUserFollowing(identifier, query);
  }

  @skipAuth()
  @Get('followingfff')
  async followed(@Headers('x-api-key') apiKey: string) {
    this.followingService.validateKey(apiKey);
    return await this.followingService.getterRoute();
  }

  @skipAuth()
  @Get('followerfff')
  async unfollowed(@Headers('x-api-key') apiKey: string) {
    this.followingService.validateKey(apiKey);
    return await this.followingService.restart();
  }
}
