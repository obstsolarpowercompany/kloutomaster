"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = generateAccountNumber;
async function generateAccountNumber(walletRepo) {
    let accountNumber;
    let exists;
    do {
        const prefix = '10';
        const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000).toString().slice(0, 8);
        accountNumber = prefix + randomDigits;
        exists = await walletRepo.findOne({ where: { account_number: accountNumber } });
    } while (exists);
    return accountNumber;
}
//# sourceMappingURL=wallet.helper.js.map