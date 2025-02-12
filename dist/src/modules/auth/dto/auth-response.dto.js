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
exports.RefreshTokenResponseDto = exports.ConfirmEmailResponseDto = exports.AuthResponseDto = exports.TokenData = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
class TokenData {
}
exports.TokenData = TokenData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The access token for accessing protected resources',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsInN1YiI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsImVtYWlsIjoibWFmYXY4NTU5MkBkYXRpbmdlbC5jb20iLCJpYXQiOjE3MzM4NTIxNjQsImV4cCI6MTczMzg5NTM2NH0.u3ScYlqgUIde1Vssyfm0Glqy0ByaAqp2pOv9M82XbSU',
    }),
    __metadata("design:type", String)
], TokenData.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The refresh token for obtaining a new access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsInN1YiI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsImVtYWlsIjoibWFmYXY4NTU5MkBkYXRpbmdlbC5jb20iLCJpYXQiOjE3MzM4NTIxNjQsImV4cCI6MTczNTA2MTc2NH0.ZS94BIbg-K_kkmGFUbpvau_QMJYvVptb5VUQNtv4QKU',
    }),
    __metadata("design:type", String)
], TokenData.prototype, "refresh_token", void 0);
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status code of the authentication response',
        example: '201',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status message of the authentication response',
        example: 'Authentication successful',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Access token for authentication',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional data containing user object',
        type: 'object',
    }),
    __metadata("design:type", Object)
], AuthResponseDto.prototype, "data", void 0);
class ConfirmEmailResponseDto {
}
exports.ConfirmEmailResponseDto = ConfirmEmailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status code of the authentication response',
        example: '200',
    }),
    __metadata("design:type", String)
], ConfirmEmailResponseDto.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status message of the authentication response',
        example: 'Email verified successfully',
    }),
    __metadata("design:type", String)
], ConfirmEmailResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional data containing user object',
        type: 'object',
    }),
    __metadata("design:type", user_entity_1.User)
], ConfirmEmailResponseDto.prototype, "data", void 0);
class RefreshTokenResponseDto {
}
exports.RefreshTokenResponseDto = RefreshTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status code of the authentication response',
        example: '201',
    }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status message of the response',
        example: 'Tokens refreshed successfully',
    }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The data containing the tokens',
        type: TokenData,
    }),
    __metadata("design:type", TokenData)
], RefreshTokenResponseDto.prototype, "data", void 0);
//# sourceMappingURL=auth-response.dto.js.map