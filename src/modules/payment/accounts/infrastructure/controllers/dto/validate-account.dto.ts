import { IsString, MinLength } from "class-validator";

export class ValidateAccountDTO {
    @IsString()
    bankCode: string;

    @IsString()
    @MinLength(10)
    accountNumber: string;
}