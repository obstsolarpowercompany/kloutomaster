import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUserWithPhoneDTO {
  @ApiProperty({
    description: "The phone number of the user",
    example: "234567890123",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]\d{1,14}$/, {
    message: "Phone number must be a valid number",
  })
  phone: string;
}

export class VerifyPhoneOTPDTO {
  @ApiProperty({
    description: "The phone number of the user",
    example: "234567890123",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: "Verication Code of userr",
    example: "000000",
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class ResendPhoneOTPDTO {
  @ApiProperty({
    description: "The phone number of the user",
    example: "234567890123",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
