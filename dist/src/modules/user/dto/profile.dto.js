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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardUserProfileStatusResponseDto = exports.UserProfileResponseDto = exports.OnboardUserProfileDto = exports.UpdateUserProfileDto = exports.CreateUserProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateUserProfileDto {
}
exports.CreateUserProfileDto = CreateUserProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'First name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name should not be empty or just spaces' }),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Last name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name should not be empty or just spaces' }),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Username of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username should not be empty or just spaces' }),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Avatar URL of the user' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bio of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserProfileDto.prototype, "phone", void 0);
class UpdateUserProfileDto {
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'First name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Last name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Username of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Avatar URL of the user' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bio of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "phone", void 0);
class OnboardUserProfileDto {
}
exports.OnboardUserProfileDto = OnboardUserProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'First name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], OnboardUserProfileDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Last name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], OnboardUserProfileDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Username of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], OnboardUserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bio of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], OnboardUserProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], OnboardUserProfileDto.prototype, "phone", void 0);
class UserProfileResponseDto {
}
exports.UserProfileResponseDto = UserProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'b9f19b82-450d-4998-9684-3fb3864df632',
        description: 'Unique identifier of the user',
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'First name of the user',
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'Last name of the user',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'johndoe@mail.com',
        description: 'Email address of the user',
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'codeghinux',
        description: 'Username of the user',
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
        description: 'Avatar URL of the user',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
        description: 'Bio of the user',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
        description: 'Phone number of the user',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Number of posts by the user',
    }),
    __metadata("design:type", Number)
], UserProfileResponseDto.prototype, "number_of_posts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Number of videos by the user',
    }),
    __metadata("design:type", Number)
], UserProfileResponseDto.prototype, "number_of_videos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Number of followers of the user',
    }),
    __metadata("design:type", Number)
], UserProfileResponseDto.prototype, "number_of_followers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Number of users the user is following',
    }),
    __metadata("design:type", Number)
], UserProfileResponseDto.prototype, "number_of_following", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-11-11T12:44:00.463Z',
        description: 'Last update timestamp of the user profile',
    }),
    __metadata("design:type", String)
], UserProfileResponseDto.prototype, "updated_at", void 0);
class OnboardUserProfileStatusResponseDto {
}
exports.OnboardUserProfileStatusResponseDto = OnboardUserProfileStatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Status of the current user',
    }),
    __metadata("design:type", Boolean)
], OnboardUserProfileStatusResponseDto.prototype, "onboarded", void 0);
//# sourceMappingURL=profile.dto.js.map