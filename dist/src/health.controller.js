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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const os = require("os");
const skipAuth_1 = require("./helpers/skipAuth");
let HealthController = class HealthController {
    home() {
        return {
            status_code: 200,
            message: 'Welcome to Klouto core services api',
        };
    }
    api() {
        return {
            status_code: 200,
            message: 'Welcome to Klouto core services api',
        };
    }
    v1() {
        return {
            status_code: 200,
            message: 'Welcome to Klouto core services api',
        };
    }
    health() {
        const networkInterfaces = os.networkInterfaces();
        let localIpAddress = 'Not available';
        for (const interfaceKey in networkInterfaces) {
            const interfaceDetails = networkInterfaces[interfaceKey];
            for (const detail of interfaceDetails) {
                if (detail.family === 'IPv4' && !detail.internal) {
                    localIpAddress = detail.address;
                    break;
                }
            }
            if (localIpAddress !== 'Not available')
                break;
        }
        return {
            status_code: 200,
            message: 'This is a healthy endpoint',
            ip: localIpAddress,
        };
    }
};
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "home", null);
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "api", null);
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('api/v1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "v1", null);
__decorate([
    (0, skipAuth_1.skipAuth)(),
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "health", null);
HealthController = __decorate([
    (0, common_1.Controller)()
], HealthController);
exports.default = HealthController;
//# sourceMappingURL=health.controller.js.map