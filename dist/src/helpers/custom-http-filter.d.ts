import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomHttpException extends HttpException {
    constructor(response: string | Record<string, any>, status: HttpStatus);
    getResponse(): any;
}
