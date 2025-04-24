import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserCommand {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
