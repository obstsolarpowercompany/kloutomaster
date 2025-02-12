"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const otp_entity_1 = require("./entities/otp.entity");
const profile_controller_1 = require("./profile/profile.controller");
const profile_service_1 = require("./profile/profile.service");
const userProfile_entity_1 = require("./entities/userProfile.entity");
const mailing_service_1 = require("../mailing/mailing.service");
const refreshToken_entity_1 = require("./entities/refreshToken.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController, profile_controller_1.ProfileController],
        providers: [user_service_1.default, profile_service_1.ProfileService, typeorm_2.Repository, mailing_service_1.MailingService],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, userProfile_entity_1.UserProfile, otp_entity_1.OTP, refreshToken_entity_1.RefreshToken])],
        exports: [user_service_1.default],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map