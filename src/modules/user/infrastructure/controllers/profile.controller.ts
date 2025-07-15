import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "../../application/profile.service";
import { Body, Controller, Get, Param, Patch, Req, Request } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user-dto";
import { UserPayload } from "../../domain/entities/interfaces/user-payload.interface";
import { OnboardUserProfileDto, UpdateUserProfileDto } from "../dto/profile.dto";
import {
  GetUserProfileByIdDocs,
  GetUserProfileByUsernameDocs,
  GetUserProfileDocs,
  OnboardUserProfileDocs,
  OnboardUserStatusDocs,
  UpdateUserProfileDocs,
} from "../docs/user-profile-swagger.doc";

@ApiBearerAuth()
@ApiTags("User Profile")
@Controller("users")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // @UpdateUserDocs()
  @GetUserProfileDocs()
  @Get("/profile/me")
  async getUserProfile(@Req() req) {
    const userId = req["user"].id;
    return this.profileService.getUserProfile(userId);
  }

  @GetUserProfileByIdDocs()
  @Get("/profile/id/:userId")
  async getUserProfileById(@Req() req, @Param("userId") userId: string) {
    return this.profileService.getUserProfile(userId);
  }

  @GetUserProfileByUsernameDocs()
  @Get("/profile/username/:username")
  async getUserProfileByUsername(@Req() req, @Param("username") username: string) {
    const userId = req["user"].id;
    return this.profileService.getUserProfileByUsername(username);
  }

  @UpdateUserProfileDocs()
  @Patch("/profile/update")
  async updateUserProfile(@Req() req, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    const userId = req["user"].id;
    return this.profileService.updateUserProfile(userId, updateUserProfileDto);
  }

  @OnboardUserProfileDocs()
  @Patch("/profile/onboard")
  async onBoardUserProfile(@Req() req, @Body() onboardUserProfileDto: OnboardUserProfileDto) {
    const userId = req["user"].id;
    console.log("Onboard User Profile DTO:", onboardUserProfileDto);
    return this.profileService.onboardUserProfile(userId, onboardUserProfileDto);
  }

  @OnboardUserStatusDocs()
  @Get("/profile/onboard/status")
  async onBoardUserStatus(@Req() req) {
    const userId = req["user"].id;
    return this.profileService.checkOnboardedStatus(userId);
  }
}
