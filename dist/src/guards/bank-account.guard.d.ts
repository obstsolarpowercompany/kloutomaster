import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BankAccountService } from 'src/modules/bank-account/bank-account.service';
export declare class BankAccountGuard implements CanActivate {
    private readonly bankAccountService;
    private readonly reflector;
    constructor(bankAccountService: BankAccountService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
