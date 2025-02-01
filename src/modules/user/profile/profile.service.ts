import { CustomHttpException } from 'src/helpers/custom-http-filter';
import UserService from '../user.service';
import * as SYS_MSG from '../../../constant/SystemMessages';
import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from '../entities/userProfile.entity';
import { Repository } from 'typeorm';
import {
  OnboardUserProfileDto,
  UpdateUserProfileDto,
} from '../dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    private userService: UserService,
  ) {}

  // async updateOnboardedField(): Promise<void> {
  //   await this.profileRepo
  //     .createQueryBuilder()
  //     .update(UserProfile)
  //     .set({ onboarded: false })
  //     .where(
  //       'first_name IS NULL OR first_name = :empty OR last_name IS NULL OR last_name = :empty OR username IS NULL OR username = :empty',
  //       { empty: '' },
  //     )
  //     .execute();

  //   console.log('User profiles updated!');
  // }

  // async onModuleInit() {
  //   // Call the method on startup
  //   await this.updateOnboardedField();
  // }

  async findProfileById(id: string) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: id } },
    });
    if (!profile) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User profile'),
        HttpStatus.NOT_FOUND,
      );
    }
    return profile;
  }

  async getUserProfile(id: string) {
    const user = await this.userService.getUserRecord({
      identifier: id,
      identifierType: 'id',
    });
    if (!user) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User'),
        HttpStatus.NOT_FOUND,
      );
    }

    const userProfile = await this.findProfileById(id);

    return {
      message: SYS_MSG.RESOURCE_FETCHED('User profile'),
      data: userProfile,
    };
  }

  async getUserProfileByUsername(username: string) {
    const user = await this.profileRepo.findOne({ where: { username } });
    if (!user) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND(`User with ${username}`),
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: SYS_MSG.RESOURCE_FETCHED('User profile'),
      data: user,
    };
  }

  async updateUserProfile(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const user = await this.userService.getUserRecord({
      identifier: id,
      identifierType: 'id',
    });
    if (!user) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User'),
        HttpStatus.NOT_FOUND,
      );
    }

    const userProfile = await this.findProfileById(id);
    if (!userProfile) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User profile'),
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUserProfile = await this.profileRepo.save({
      ...userProfile,
      ...updateUserProfileDto,
    });

    return {
      message: SYS_MSG.RESOURCE_UPDATED('User profile'),
      data: updatedUserProfile,
    };
  }

  async onboardUserProfile(userId: string, payload: OnboardUserProfileDto) {
    const user = await this.userService.getUserRecord({
      identifier: userId,
      identifierType: 'id',
    });
    if (!user) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User'),
        HttpStatus.NOT_FOUND,
      );
    }

    let userProfile: UserProfile;

    console.log('Profile: ', user);

    // Find the user profile or create a new one if not found
    userProfile = await this.findProfileById(userId);

    if (!userProfile) {
      userProfile = this.profileRepo.create({
        user: user,
      });
    }

    // Update the profile fields with data from the payload
    userProfile.first_name = payload.first_name;
    userProfile.last_name = payload.last_name;
    userProfile.username = payload.username;
    userProfile.bio = payload.bio;
    userProfile.phone = payload.phone;

    // Mark the profile as onboarded
    userProfile.onboarded = true;

    // Save the updated profile
    await this.profileRepo.save(userProfile);

    return {
      message: SYS_MSG.RESOURCE_UPDATED('User profile'),
      data: userProfile,
    };
  }

  async checkOnboardedStatus(userId: string) {
    const user = await this.userService.getUserRecord({
      identifier: userId,
      identifierType: 'id',
    });
    if (!user) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User'),
        HttpStatus.NOT_FOUND,
      );
    }

    const userProfile = await this.findProfileById(userId);
    if (!userProfile) {
      throw new CustomHttpException(
        SYS_MSG.RESOURCE_NOT_FOUND('User profile'),
        HttpStatus.NOT_FOUND,
      );
    }

    const onboardStatus = userProfile.onboarded;

    return {
      message: SYS_MSG.RESOURCE_FETCHED('User profile onboarded status'),
      data: { onboardStatus },
    };
  }
}
