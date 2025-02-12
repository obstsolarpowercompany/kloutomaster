"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResponseInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ResponseInterceptor = ResponseInterceptor_1 = class ResponseInterceptor {
    constructor() {
        this.logger = new common_1.Logger(ResponseInterceptor_1.name);
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => this.responseHandler(res, context)), (0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => this.errorHandler(err, context))));
    }
    errorHandler(exception, context) {
        const req = context.switchToHttp().getRequest();
        if (exception instanceof common_1.HttpException)
            return exception;
        this.logger.error(`Error processing request for ${req.method} ${req.url}, Message: ${exception['message']}, Stack: ${exception['stack']}`);
        return new common_1.InternalServerErrorException({
            status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
        });
    }
    responseHandler(res, context) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const status_code = response.statusCode;
        response.setHeader('Content-Type', 'application/json');
        if (typeof res === 'object') {
            const { message, ...data } = res;
            return {
                status_code,
                message,
                ...data,
            };
        }
        else {
            return res;
        }
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = ResponseInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map