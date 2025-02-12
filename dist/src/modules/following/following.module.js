"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingModule = void 0;
const common_1 = require("@nestjs/common");
const following_service_1 = require("./following.service");
const following_controller_1 = require("./following.controller");
const following_entity_1 = require("./entities/following.entity");
const typeorm_1 = require("@nestjs/typeorm");
const userProfile_entity_1 = require("../user/entities/userProfile.entity");
let FollowingModule = class FollowingModule {
};
exports.FollowingModule = FollowingModule;
exports.FollowingModule = FollowingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([following_entity_1.Follower, userProfile_entity_1.UserProfile])],
        controllers: [following_controller_1.FollowingController],
        providers: [following_service_1.FollowingService],
    })
], FollowingModule);
//# sourceMappingURL=following.module.js.map