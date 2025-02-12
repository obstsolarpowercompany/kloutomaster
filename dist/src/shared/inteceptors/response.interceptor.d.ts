import { CallHandler, ExecutionContext, HttpException, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor implements NestInterceptor {
    private readonly logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
    errorHandler(exception: unknown, context: ExecutionContext): HttpException;
    responseHandler(res: any, context: ExecutionContext): any;
}
