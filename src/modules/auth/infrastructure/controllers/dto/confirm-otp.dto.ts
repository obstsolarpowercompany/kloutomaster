import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ConfirmOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class ResendOTPDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
