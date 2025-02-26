"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteUserDocs = SoftDeleteUserDocs;
exports.UpdateUserDocs = UpdateUserDocs;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("../dto/update-user-dto");
function SoftDeleteUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Soft delete a user account' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Deletion in progress' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }));
}
function UpdateUserDocs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiOperation)({ summary: 'Update User' }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User updated successfully',
        type: update_user_dto_1.UpdateUserDto,
    }));
}
//# sourceMappingURL=user-swagger.doc.js.map