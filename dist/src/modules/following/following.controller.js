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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingController = void 0;
const common_1 = require("@nestjs/common");
const following_service_1 = require("./following.service");
const following_swagger_doc_1 = require("./docs/following-swagger.doc");
const skipAuth_1 = require("../../helpers/skipAuth");
let FollowingController = class FollowingController {
    constructor(followingService) {
        this.followingService = followingService;
    }
    create(req, username) {
        const followerId = req['user'].id;
        return this.followingService.followUser(followerId, username);
    }
    unfollowUser(req, username) {
        const followeId = req['user'].id;
        return this.followingService.unfollowUser(followeId, username);
    }
    async getAuthenticatedFollowers(req, query) {
        const identifier = req['user'].id;
        return await this.followingService.getUserFollowers(identifier, query);
    }
    async getAuthenticatedFollowing(req, query) {
        const identifier = req['user'].id;
        return await this.followingService.getUserFollowing(identifier, query);
    }
    async getFollowers(identifier, query) {
        return await this.followingService.getUserFollowers(identifier, query);
    }
    async getFollowing(identifier, query) {
        return await this.followingService.getUserFollowing(identifier, query);
    }
    async followed(apiKey) {
        this.followingService.validateKey(apiKey);
        return await this.followingService.getterRoute();
    }
    async unfollowed(apiKey) {
        this.followingService.validateKey(apiKey);
        return await this.followingService.restart();
    }
};
exports.FollowingController = FollowingController;
__decorate([
    (0, following_swagger_doc_1.FollowUserDocs)(),
    (0, common_1.Post)('/:username/follow'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FollowingController.prototype, "create", null);
__decorate([
    (0, following_swagger_doc_1.UnfollowUserDocs)(),
    (0, common_1.Delete)('/:username/unfollow'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FollowingController.prototype, "unfollowUser", null);
__decorate([
    (0, following_swagger_doc_1.GetAuthenticatedUserFollowersDocs)(),
    (0, common_1.Get)('/followers'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "getAuthenticatedFollowers", null);
__decorate([
    (0, following_swagger_doc_1.GetAuthenticatedUserFollowingDocs)(),
    (0, common_1.Get)('/following'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "getAuthenticatedFollowing", null);
__decorate([
    (0, following_swagger_doc_1.GetFollowersByIdentifierDocs)(),
    (0, common_1.Get)(':identifier/followers'),
    __param(0, (0, common_1.Param)('identifier')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "getFollowers", null);
__decorate([
    (0, following_swagger_doc_1.GetFollowingByIdentifierDocs)(),
    (0, common_1.Get)(':identifier/following'),
    __param(0, (0, common_1.Param)('identifier')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "getFollowing", null);
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('followingfff'),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "followed", null);
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('followerfff'),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowingController.prototype, "unfollowed", null);
exports.FollowingController = FollowingController = __decorate([
    (0, common_1.Controller)('follower'),
    __metadata("design:paramtypes", [following_service_1.FollowingService])
], FollowingController);
//# sourceMappingURL=following.controller.js.map