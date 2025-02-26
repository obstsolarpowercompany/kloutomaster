"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFollowingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_following_dto_1 = require("./create-following.dto");
class UpdateFollowingDto extends (0, swagger_1.PartialType)(create_following_dto_1.CreateFollowingDto) {
}
exports.UpdateFollowingDto = UpdateFollowingDto;
//# sourceMappingURL=update-following.dto.js.map