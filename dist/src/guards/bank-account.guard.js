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
exports.BankAccountGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const bank_account_service_1 = require("../modules/bank-account/bank-account.service");
let BankAccountGuard = class BankAccountGuard {
    constructor(bankAccountService, reflector) {
        this.bankAccountService = bankAccountService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const bankAccountId = request.params.bankAccountId;
        if (!user || !bankAccountId) {
            throw new common_1.ForbiddenException('Invalid user or bank account access.');
        }
        if (user.role === 'admin') {
            return true;
        }
        const bankAccount = await this.bankAccountService.getBankAccountById(bankAccountId);
        if (!bankAccount) {
            throw new common_1.ForbiddenException('Bank account not found.');
        }
        return true;
    }
};
exports.BankAccountGuard = BankAccountGuard;
exports.BankAccountGuard = BankAccountGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bank_account_service_1.BankAccountService,
        core_1.Reflector])
], BankAccountGuard);
//# sourceMappingURL=bank-account.guard.js.map