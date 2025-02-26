"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomExceptionHandler;
const common_1 = require("@nestjs/common");
function CustomExceptionHandler(exception) {
    const { response, status } = exception;
    if (status !== 500) {
        throw new common_1.HttpException(response, status);
    }
}
//# sourceMappingURL=exceptionHandler.js.map