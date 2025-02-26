"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = getRefreshToken;
function getRefreshToken(req) {
    const refreshTokenFromCookies = req.cookies?.['refresh_token'];
    if (refreshTokenFromCookies) {
        return refreshTokenFromCookies;
    }
    const refreshTokenFromHeader = req.headers['x-refresh-token'];
    if (typeof refreshTokenFromHeader === 'string') {
        return refreshTokenFromHeader;
    }
    return undefined;
}
//# sourceMappingURL=auth.js.map