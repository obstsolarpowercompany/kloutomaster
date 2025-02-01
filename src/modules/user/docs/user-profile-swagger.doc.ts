import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import {
  OnboardUserProfileDto,
  OnboardUserProfileStatusResponseDto,
  UserProfileResponseDto,
} from '../dto/profile.dto';

export function GetUserProfileDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get the profile of the current user' }),
    ApiResponse({
      status: 200,
      description: 'User profile retrieved successfully',
      type: UserProfileResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function GetUserProfileByIdDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get the profile of a user by ID' }),
    ApiResponse({
      status: 200,
      description: 'User profile retrieved successfully',
      type: UserProfileResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function GetUserProfileByUsernameDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get the profile of a user by username' }),
    ApiResponse({
      status: 200,
      description: 'User profile retrieved successfully',
      type: UserProfileResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function UpdateUserProfileDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update the profile of the current user' }),
    ApiResponse({
      status: 200,
      description: 'User profile updated successfully',
      type: UserProfileResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function OnboardUserProfileDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Onboard and complete the profile of current user',
    }),
    ApiResponse({
      status: 200,
      description: 'User profile updated successfully',
      type: OnboardUserProfileDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function OnboardUserStatusDocs() {
  return applyDecorators(
    ApiTags('Users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Onboard status of the profile of current user' }),
    ApiResponse({
      status: 200,
      description: 'User profile updated successfully',
      type: OnboardUserProfileStatusResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
