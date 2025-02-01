import { UserProfile } from '../entities/userProfile.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import * as SYS_MSG from '../../../constant/SystemMessages';
import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '../../../helpers/custom-http-filter';

export async function getUserIdByIdentifier(
  identifier: string,
  userProfileRepo: Repository<UserProfile>,
): Promise<string> {
  let userId: string;

  if (isUUID(identifier)) {
    // Fetch user by ID
    const userProfile = await userProfileRepo.findOne({
      where: { user: { id: identifier } },
      relations: ['user'],
    });
    userId = userProfile?.user?.id;
  } else {
    // Fetch user by username
    const userProfile = await userProfileRepo.findOne({
      where: { username: identifier },
      relations: ['user'],
    });
    userId = userProfile?.user?.id;
  }

  if (!userId) {
    throw new CustomHttpException(
      SYS_MSG.RESOURCE_NOT_FOUND('User '),
      HttpStatus.NOT_FOUND,
    );
  }

  return userId;
}

export function mapProfileToResponse(profile: any) {
  return {
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username,
    avatar_url: profile.avatar_url,
  };
}
