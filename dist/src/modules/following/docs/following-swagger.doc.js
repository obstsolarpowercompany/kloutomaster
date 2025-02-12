"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUserDocs = FollowUserDocs;
exports.UnfollowUserDocs = UnfollowUserDocs;
exports.GetAuthenticatedUserFollowersDocs = GetAuthenticatedUserFollowersDocs;
exports.GetAuthenticatedUserFollowingDocs = GetAuthenticatedUserFollowingDocs;
exports.GetFollowersByIdentifierDocs = GetFollowersByIdentifierDocs;
exports.GetFollowingByIdentifierDocs = GetFollowingByIdentifierDocs;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const following_response_dto_1 = require("../dto/following-response.dto");
function FollowUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiOperation)({ summary: 'Follow a user' }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiParam)({
        name: 'username',
        description: 'Username of the user to follow',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully followed the user',
        type: following_response_dto_1.FollowUserResponseDTO,
    }), (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to follow the user',
    }));
}
function UnfollowUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiOperation)({ summary: 'Unfollow a user' }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiParam)({
        name: 'username',
        description: 'Username of the user to unfollow',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully unfollowed the user',
    }), (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to unfollow the user',
    }));
}
function GetAuthenticatedUserFollowersDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiOperation)({
        summary: 'Get list of followers of the authenticated user',
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number for pagination',
    }), (0, swagger_1.ApiQuery)({
        name: 'lmit',
        description: 'Limit for pagination',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of followers retrieved successfully',
        type: following_response_dto_1.GetFollowingResponseDTO,
    }), (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'User is not authenticated',
    }));
}
function GetAuthenticatedUserFollowingDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiOperation)({
        summary: 'Get list of users the authenticated user is following',
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number for pagination',
    }), (0, swagger_1.ApiQuery)({
        name: 'lmit',
        description: 'Limit for pagination',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of following users retrieved successfully',
        type: following_response_dto_1.GetFollowingResponseDTO,
    }), (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'User is not authenticated',
    }));
}
function GetFollowersByIdentifierDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiOperation)({
        summary: 'Get list of followers for a specific user by identifier (Username or UserId)',
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiParam)({ name: 'identifier', description: 'User identifier' }), (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number for pagination',
    }), (0, swagger_1.ApiQuery)({
        name: 'lmit',
        description: 'Limit for pagination',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of followers retrieved successfully',
        type: following_response_dto_1.GetFollowingResponseDTO,
    }), (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found',
    }));
}
function GetFollowingByIdentifierDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Following'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({
        summary: 'Get list of users a specific user is following by identifier (Username or UserId)',
    }), (0, swagger_1.ApiParam)({ name: 'identifier', description: 'User identifier' }), (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number for pagination',
    }), (0, swagger_1.ApiQuery)({
        name: 'lmit',
        description: 'Limit for pagination',
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of following users retrieved successfully',
        type: following_response_dto_1.GetFollowingResponseDTO,
    }), (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found',
    }));
}
//# sourceMappingURL=following-swagger.doc.js.map