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
exports.FollowUserResponseDTO = exports.GetFollowingResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the user' }),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First name of the user', nullable: true }),
    __metadata("design:type", String)
], UserDTO.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last name of the user', nullable: true }),
    __metadata("design:type", String)
], UserDTO.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Username of the user' }),
    __metadata("design:type", String)
], UserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the avatar image of the user',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "avatar_url", void 0);
class GetFollowingResponseDTO {
}
exports.GetFollowingResponseDTO = GetFollowingResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response status code' }),
    __metadata("design:type", Number)
], GetFollowingResponseDTO.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Followers retrieved successfully' }),
    __metadata("design:type", String)
], GetFollowingResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of users the authenticated user is following',
        type: [UserDTO],
    }),
    __metadata("design:type", Array)
], GetFollowingResponseDTO.prototype, "data", void 0);
class FollowUserResponseDTO {
}
exports.FollowUserResponseDTO = FollowUserResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response status code' }),
    __metadata("design:type", Number)
], FollowUserResponseDTO.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response message' }),
    __metadata("design:type", String)
], FollowUserResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Details of the user who is following and the followed user',
    }),
    __metadata("design:type", Object)
], FollowUserResponseDTO.prototype, "data", void 0);
//# sourceMappingURL=following-response.dto.js.map