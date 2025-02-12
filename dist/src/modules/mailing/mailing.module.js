"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingModule = void 0;
const common_1 = require("@nestjs/common");
const mailing_service_1 = require("./mailing.service");
let MailingModule = class MailingModule {
};
exports.MailingModule = MailingModule;
exports.MailingModule = MailingModule = __decorate([
    (0, common_1.Module)({
        providers: [mailing_service_1.MailingService],
        exports: [mailing_service_1.MailingService],
    })
], MailingModule);
//# sourceMappingURL=mailing.module.js.map