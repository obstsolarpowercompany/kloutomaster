"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipAuth = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const skipAuth = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.skipAuth = skipAuth;
//# sourceMappingURL=skipAuth.js.map