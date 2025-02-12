"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const nestjs_pino_1 = require("nestjs-pino");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_config_1 = require("../config/auth.config");
const server_config_1 = require("../config/server.config");
const data_source_1 = require("./database/data-source");
const health_controller_1 = require("./health.controller");
const probe_controller_1 = require("./probe.controller");
const auth_guard_1 = require("./guards/auth.guard");
const auth_module_1 = require("./modules/auth/auth.module");
const mailing_module_1 = require("./modules/mailing/mailing.module");
const user_module_1 = require("./modules/user/user.module");
const following_module_1 = require("./modules/following/following.module");
const payment_module_1 = require("./modules/payment/payment.module");
const maintenance_interceptor_1 = require("./interceptors/maintenance.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'CONFIG',
                useClass: config_1.ConfigService,
            },
            {
                provide: core_1.APP_PIPE,
                useFactory: () => new common_1.ValidationPipe({
                    whitelist: true,
                    forbidNonWhitelisted: true,
                }),
            },
            {
                provide: 'APP_GUARD',
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: maintenance_interceptor_1.MaintenanceInterceptor,
            },
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.development.local', `.env.${process.env.PROFILE}`],
                isGlobal: true,
                load: [server_config_1.default, auth_config_1.default],
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'production', 'test', 'provision')
                        .required(),
                    PROFILE: Joi.string()
                        .valid('local', 'development', 'production', 'ci', 'testing', 'staging')
                        .required(),
                    PORT: Joi.number().required(),
                }),
            }),
            nestjs_pino_1.LoggerModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => ({
                    ...data_source_1.default.options,
                }),
                dataSourceFactory: async () => data_source_1.default,
            }),
            auth_module_1.AuthModule,
            mailing_module_1.MailingModule,
            user_module_1.UserModule,
            mailing_module_1.MailingModule,
            following_module_1.FollowingModule,
            payment_module_1.PaymentModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    index: false,
                },
            }),
        ],
        controllers: [health_controller_1.default, probe_controller_1.default],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map