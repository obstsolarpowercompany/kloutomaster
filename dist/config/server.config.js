"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('server', () => ({
    port: parseInt(process.env.PORT, 10) || 3008,
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        password: process.env.SMTP_PASSWORD,
        user: process.env.SMTP_USER,
        server: process.env.SMTP_SERVER,
        generalHost: process.env.SMTP_GENERAL_HOST,
        generalPort: process.env.SMTP_GENERAL_PORT,
        generalSecure: process.env.SMTP_GENERAL_SECURE,
        generalUser: process.env.SMTP_GENERAL_USER,
        generalPassword: process.env.SMTP_GENERAL_PASSWORD,
    },
}));
//# sourceMappingURL=server.config.js.map