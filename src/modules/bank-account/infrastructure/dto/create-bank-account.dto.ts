import { IsString, MinLength } from "class-validator";

export class CreateBankAccountDTO {
    @IsString()
    accountHolderName: string;

    @IsString()
    @MinLength(10)
    accountNumber: string;

    @IsString()
    bankName: string;

    @IsString()
    bankCode: string;
}