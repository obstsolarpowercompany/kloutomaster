"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileDocs = GetUserProfileDocs;
exports.GetUserProfileByIdDocs = GetUserProfileByIdDocs;
exports.GetUserProfileByUsernameDocs = GetUserProfileByUsernameDocs;
exports.UpdateUserProfileDocs = UpdateUserProfileDocs;
exports.OnboardUserProfileDocs = OnboardUserProfileDocs;
exports.OnboardUserStatusDocs = OnboardUserStatusDocs;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const profile_dto_1 = require("../dto/profile.dto");
function GetUserProfileDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get the profile of the current user' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully',
        type: profile_dto_1.UserProfileResponseDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function GetUserProfileByIdDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get the profile of a user by ID' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully',
        type: profile_dto_1.UserProfileResponseDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function GetUserProfileByUsernameDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get the profile of a user by username' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully',
        type: profile_dto_1.UserProfileResponseDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function UpdateUserProfileDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Update the profile of the current user' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile updated successfully',
        type: profile_dto_1.UserProfileResponseDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function OnboardUserProfileDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({
        summary: 'Onboard and complete the profile of current user',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile updated successfully',
        type: profile_dto_1.OnboardUserProfileDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function OnboardUserStatusDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Onboard status of the profile of current user' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile updated successfully',
        type: profile_dto_1.OnboardUserProfileStatusResponseDto,
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
//# sourceMappingURL=user-profile-swagger.doc.js.map