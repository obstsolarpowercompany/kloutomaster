import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  FollowUserResponseDTO,
  GetFollowingResponseDTO,
} from '../dto/following-response.dto';

export function FollowUserDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiOperation({ summary: 'Follow a user' }),
    ApiBearerAuth(),
    ApiParam({
      name: 'username',
      description: 'Username of the user to follow',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully followed the user',
      type: FollowUserResponseDTO,
    }),
    ApiResponse({
      status: 400,
      description: 'Failed to follow the user',
    }),
  );
}

export function UnfollowUserDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiOperation({ summary: 'Unfollow a user' }),
    ApiBearerAuth(),
    ApiParam({
      name: 'username',
      description: 'Username of the user to unfollow',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully unfollowed the user',
    }),
    ApiResponse({
      status: 400,
      description: 'Failed to unfollow the user',
    }),
  );
}

export function GetAuthenticatedUserFollowersDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiOperation({
      summary: 'Get list of followers of the authenticated user',
    }),
    ApiBearerAuth(),
    ApiQuery({
      name: 'page',
      description: 'Page number for pagination',
    }),
    ApiQuery({
      name: 'lmit',
      description: 'Limit for pagination',
    }),
    ApiResponse({
      status: 200,
      description: 'List of followers retrieved successfully',
      type: GetFollowingResponseDTO,
    }),
    ApiResponse({
      status: 401,
      description: 'User is not authenticated',
    }),
  );
}

export function GetAuthenticatedUserFollowingDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiOperation({
      summary: 'Get list of users the authenticated user is following',
    }),
    ApiBearerAuth(),
    ApiQuery({
      name: 'page',
      description: 'Page number for pagination',
    }),
    ApiQuery({
      name: 'lmit',
      description: 'Limit for pagination',
    }),
    ApiResponse({
      status: 200,
      description: 'List of following users retrieved successfully',
      type: GetFollowingResponseDTO,
    }),
    ApiResponse({
      status: 401,
      description: 'User is not authenticated',
    }),
  );
}

export function GetFollowersByIdentifierDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiOperation({
      summary:
        'Get list of followers for a specific user by identifier (Username or UserId)',
    }),
    ApiBearerAuth(),
    ApiParam({ name: 'identifier', description: 'User identifier' }),
    ApiQuery({
      name: 'page',
      description: 'Page number for pagination',
    }),
    ApiQuery({
      name: 'lmit',
      description: 'Limit for pagination',
    }),
    ApiResponse({
      status: 200,
      description: 'List of followers retrieved successfully',
      type: GetFollowingResponseDTO,
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );
}

export function GetFollowingByIdentifierDocs() {
  return applyDecorators(
    ApiTags('Following'),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Get list of users a specific user is following by identifier (Username or UserId)',
    }),
    ApiParam({ name: 'identifier', description: 'User identifier' }),
    ApiQuery({
      name: 'page',
      description: 'Page number for pagination',
    }),
    ApiQuery({
      name: 'lmit',
      description: 'Limit for pagination',
    }),
    ApiResponse({
      status: 200,
      description: 'List of following users retrieved successfully',
      type: GetFollowingResponseDTO,
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );
}
