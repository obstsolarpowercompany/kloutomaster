import { IsOptional, IsString } from "class-validator";

export class PaginationDTO {
    @IsString()
    perPage: string;

    @IsString()
    page: string;

    @IsString()
    @IsOptional()
    search?: string;
}