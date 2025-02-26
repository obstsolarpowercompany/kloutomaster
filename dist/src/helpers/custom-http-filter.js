"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
class CustomHttpException extends common_1.HttpException {
    constructor(response, status) {
        super(response, status);
    }
    getResponse() {
        const response = super.getResponse();
        const status_code = this.getStatus();
        if (typeof response === 'object' && response !== null) {
            const res = response;
            return {
                message: res.message || 'An error occurred',
                status_code,
            };
        }
        return {
            message: response,
            status_code,
        };
    }
}
exports.CustomHttpException = CustomHttpException;
//# sourceMappingURL=custom-http-filter.js.map