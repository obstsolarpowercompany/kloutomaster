import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {



  @IsOptional()
  @IsEmail()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEmail()
  status?: string;

  @IsOptional()
  @IsEmail()
  is_active?: string;

  @IsOptional()
  @IsEmail()
  is_verified?: boolean;

  @IsOptional()
  @IsEmail()
  deletedAt?: string;

  @IsOptional()
  @IsEmail()
  user_type?: string;

}
