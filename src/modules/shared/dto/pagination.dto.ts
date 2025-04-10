import { IsOptional, IsString } from "class-validator";

export class PaginationDTO {
    @IsString()
    @IsOptional()
    perPage: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    search?: string;
}