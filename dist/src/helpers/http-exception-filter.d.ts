import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export interface ExceptionResponse {
    statusCode: number;
    message: string | string[];
    error: string;
}
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
