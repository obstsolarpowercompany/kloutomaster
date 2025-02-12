"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDocs = LoginUserDocs;
exports.RegisterUserDocs = RegisterUserDocs;
exports.ConirmEmailDocs = ConirmEmailDocs;
exports.ResendOTPDocs = ResendOTPDocs;
exports.RefreshTokenDocs = RefreshTokenDocs;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("../../user/dto/user-response.dto");
const auth_response_dto_1 = require("../dto/auth-response.dto");
const create_user_dto_1 = require("../dto/create-user.dto");
function LoginUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Authentication'), (0, swagger_1.ApiOperation)({ summary: 'Login a user' }), (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDTO }));
}
function RegisterUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Authentication'), (0, swagger_1.ApiOperation)({ summary: 'User Registration' }), (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDTO }), (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Register a new user',
        type: user_response_dto_1.SuccessCreateUserResponse,
    }), (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'User already exists',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }));
}
function ConirmEmailDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Authentication'), (0, swagger_1.ApiOperation)({ summary: 'Confirm Email with OTP' }), (0, swagger_1.ApiBody)({ type: create_user_dto_1.ConfirmEmailDTO }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email verified successfully',
        type: auth_response_dto_1.ConfirmEmailResponseDto,
    }), (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Invalid id',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }), (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: 'Not Found Error',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }));
}
function ResendOTPDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Authentication'), (0, swagger_1.ApiOperation)({ summary: 'Confirm Email with OTP' }), (0, swagger_1.ApiBody)({ type: create_user_dto_1.ConfirmEmailDTO }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email verified successfully',
        type: auth_response_dto_1.ConfirmEmailResponseDto,
    }), (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Invalid id',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }), (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: 'Not Found Error',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }));
}
function RefreshTokenDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Authentication'), (0, swagger_1.ApiOperation)({ summary: 'Refresh Access Token' }), (0, swagger_1.ApiHeader)({
        name: 'X-Refresh-Token',
        description: 'Refresh token to obtain a new access token',
        required: false,
    }), (0, swagger_1.ApiCookieAuth)('refresh_token'), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Access token refreshed successfully',
        type: auth_response_dto_1.RefreshTokenResponseDto,
    }), (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Invalid refresh token',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }), (0, swagger_1.ApiUnauthorizedResponse)({
        status: 401,
        description: 'Unauthorized',
        type: user_response_dto_1.ErrorCreateUserResponse,
    }));
}
//# sourceMappingURL=auth-swagger.doc.js.map