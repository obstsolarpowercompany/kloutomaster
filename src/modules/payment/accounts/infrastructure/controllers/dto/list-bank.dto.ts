import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ListBanksDTO {
    @IsOptional()
    perPage: number;

    @IsOptional()
    @IsBoolean()
    useCursor: boolean;

    @IsOptional()
    @IsString()
    next: string;

    @IsOptional()
    @IsString()
    prev: string;

    @IsString()
    country: string;
}