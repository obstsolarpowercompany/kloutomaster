"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const swagger_1 = require("@nestjs/swagger");
const profile_service_1 = require("./profile.service");
const common_1 = require("@nestjs/common");
const profile_dto_1 = require("../dto/profile.dto");
const user_profile_swagger_doc_1 = require("../docs/user-profile-swagger.doc");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getUserProfile(req) {
        const userId = req['user'].id;
        return this.profileService.getUserProfile(userId);
    }
    async getUserProfileById(req, userId) {
        return this.profileService.getUserProfile(userId);
    }
    async getUserProfileByUsername(req, username) {
        const userId = req['user'].id;
        return this.profileService.getUserProfileByUsername(username);
    }
    async updateUserProfile(req, updateUserProfileDto) {
        const userId = req['user'].id;
        return this.profileService.updateUserProfile(userId, updateUserProfileDto);
    }
    async onBoardUserProfile(req, onboardUserProfileDto) {
        const userId = req['user'].id;
        return this.profileService.onboardUserProfile(userId, onboardUserProfileDto);
    }
    async onBoardUserStatus(req) {
        const userId = req['user'].id;
        return this.profileService.checkOnboardedStatus(userId);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, user_profile_swagger_doc_1.GetUserProfileDocs)(),
    (0, common_1.Get)('/profile/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUserProfile", null);
__decorate([
    (0, user_profile_swagger_doc_1.GetUserProfileByIdDocs)(),
    (0, common_1.Get)('/profile/id/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUserProfileById", null);
__decorate([
    (0, user_profile_swagger_doc_1.GetUserProfileByUsernameDocs)(),
    (0, common_1.Get)('/profile/username/:username'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUserProfileByUsername", null);
__decorate([
    (0, user_profile_swagger_doc_1.UpdateUserProfileDocs)(),
    (0, common_1.Patch)('/profile/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateUserProfile", null);
__decorate([
    (0, user_profile_swagger_doc_1.OnboardUserProfileDocs)(),
    (0, common_1.Patch)('/profile/onboard'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.OnboardUserProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "onBoardUserProfile", null);
__decorate([
    (0, user_profile_swagger_doc_1.OnboardUserStatusDocs)(),
    (0, common_1.Get)('/profile/onboard/status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "onBoardUserStatus", null);
exports.ProfileController = ProfileController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('User Profile'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map