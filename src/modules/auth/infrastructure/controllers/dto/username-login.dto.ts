import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UsernameLoginDto {
  @ApiProperty({
    description: "Username of the user trying to log in",
    example: "martins",
    type: String,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "Two-factor authentication code from the authenticator app",
    example: "000000",
    type: String,
  })
  @IsNotEmpty()
  otpCode: string;
}
