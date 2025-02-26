"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByIdentifier = getUserIdByIdentifier;
exports.mapProfileToResponse = mapProfileToResponse;
const class_validator_1 = require("class-validator");
const SYS_MSG = require("../../../constant/SystemMessages");
const common_1 = require("@nestjs/common");
const custom_http_filter_1 = require("../../../helpers/custom-http-filter");
async function getUserIdByIdentifier(identifier, userProfileRepo) {
    let userId;
    if ((0, class_validator_1.isUUID)(identifier)) {
        const userProfile = await userProfileRepo.findOne({
            where: { user: { id: identifier } },
            relations: ['user'],
        });
        userId = userProfile?.user?.id;
    }
    else {
        const userProfile = await userProfileRepo.findOne({
            where: { username: identifier },
            relations: ['user'],
        });
        userId = userProfile?.user?.id;
    }
    if (!userId) {
        throw new custom_http_filter_1.CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('User '), common_1.HttpStatus.NOT_FOUND);
    }
    return userId;
}
function mapProfileToResponse(profile) {
    return {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        username: profile.username,
        avatar_url: profile.avatar_url,
    };
}
//# sourceMappingURL=profile.utils.js.map