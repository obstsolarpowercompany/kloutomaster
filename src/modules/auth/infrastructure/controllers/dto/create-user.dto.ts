import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'An optional admin secret for elevated permissions',
    example: 'admin123',
    required: false,
  })
  @IsOptional()
  @IsString()
  admin_secret?: string;
}

export class ConfirmEmailDTO {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The otp code for email confirmation',
    example: '6382783',
    required: true,
  })
  @IsString()
  otp?: string;
}
