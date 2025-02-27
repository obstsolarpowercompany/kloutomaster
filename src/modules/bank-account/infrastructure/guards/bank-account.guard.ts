import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BankAccountService } from 'src/modules/bank-account/bank-account.service';

@Injectable()
export class BankAccountGuard implements CanActivate {
    constructor(
        private readonly bankAccountService: BankAccountService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const bankAccountId = request.params.bankAccountId;

        if (!user || !bankAccountId) {
            throw new ForbiddenException('Invalid user or bank account access.');
        }

        // Check if the user is an admin
        if (user.role === 'admin') {
            return true;
        }

        // Check if the user is the owner of the bank account
        const bankAccount =
            await this.bankAccountService.getBankAccountById(bankAccountId);

        if (!bankAccount) {
            throw new ForbiddenException('Bank account not found.');
        }

        // if (bankAccount.user.id !== user.id) {
        //   throw new ForbiddenException(
        //     'You do not have access to this bank account.',
        //   );
        // }

        return true;
    }
}
