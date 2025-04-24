import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateBankAccountDTO {
    @IsString()
    @IsOptional()
    accountHolderName: string;

    @IsBoolean()
    passThrough: boolean;

    @IsString()
    @MinLength(10)
    accountNumber: string;

    @IsString()
    @MinLength(3)
    bankName: string;

    @IsString()
    bankCode: string;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}