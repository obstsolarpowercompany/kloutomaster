"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUser = void 0;
const wallet_entity_1 = require("../../../wallet/entities/wallet.entity");
exports.mockUser = {
    id: 'user1',
    email: 'john@example.com',
    is_active: true,
    is_verified: true,
    is_creator: true,
    status: 'active',
    user_type: 'user',
    profile: null,
    followers: [],
    following: [],
    created_at: new Date(),
    updated_at: new Date(),
    interests: [],
    refreshTokens: [],
    wallet: new wallet_entity_1.Wallet(),
};
//# sourceMappingURL=user.mock.js.map