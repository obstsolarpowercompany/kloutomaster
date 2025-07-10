import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUserWithPhoneDTO {
  @ApiProperty({
    description: "The phone number of the user",
    example: "234567890123",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: "Phone number must be a valid international format",
  })
  phone: string;
}

export class VerifyPhoneOTPDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class ResendPhoneOTPDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;
}
