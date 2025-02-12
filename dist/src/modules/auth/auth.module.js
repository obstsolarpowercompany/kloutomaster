"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const auth_config_1 = require("../../../config/auth.config");
const mailing_service_1 = require("../mailing/mailing.service");
const otp_entity_1 = require("../user/entities/otp.entity");
const bull_1 = require("@nestjs/bull");
const refreshToken_entity_1 = require("../user/entities/refreshToken.entity");
const wallet_entity_1 = require("../wallet/entities/wallet.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.default],
        providers: [auth_service_1.default, typeorm_2.Repository, user_service_1.default, mailing_service_1.MailingService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, otp_entity_1.OTP, refreshToken_entity_1.RefreshToken, wallet_entity_1.Wallet]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: (0, auth_config_1.default)().jwtSecret,
                signOptions: { expiresIn: `${(0, auth_config_1.default)().jwtExpiry}s` },
            }),
            bull_1.BullModule.registerQueue({
                name: 'mailing',
            }),
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map