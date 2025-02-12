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
exports.LoginErrorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginErrorResponseDto {
}
exports.LoginErrorResponseDto = LoginErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message providing details about the login failure',
        example: 'Invalid credentials provided',
    }),
    __metadata("design:type", String)
], LoginErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code indicating the type of error',
        example: 401,
    }),
    __metadata("design:type", Number)
], LoginErrorResponseDto.prototype, "status_code", void 0);
//# sourceMappingURL=login-error-dto.js.map