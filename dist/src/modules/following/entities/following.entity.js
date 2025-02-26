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
exports.Follower = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
let Follower = class Follower {
};
exports.Follower = Follower;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Follower.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.followers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'follower_id' }),
    __metadata("design:type", user_entity_1.User)
], Follower.prototype, "follower", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.following, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'followee_id' }),
    __metadata("design:type", user_entity_1.User)
], Follower.prototype, "followee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'followed_at' }),
    __metadata("design:type", Date)
], Follower.prototype, "followedAt", void 0);
exports.Follower = Follower = __decorate([
    (0, typeorm_1.Entity)('Follower')
], Follower);
//# sourceMappingURL=following.entity.js.map