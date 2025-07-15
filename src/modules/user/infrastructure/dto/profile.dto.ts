import { IsString, IsOptional, IsEmail, IsUrl, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateUserProfileDto {
  @ApiPropertyOptional({ description: "First name of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "First name should not be empty or just spaces" })
  first_name?: string;

  @ApiPropertyOptional({ description: "Last name of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "Last name should not be empty or just spaces" })
  last_name?: string;

  @ApiPropertyOptional({ description: "Email address of the user" })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: "Username of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "Username should not be empty or just spaces" })
  username?: string;

  @ApiPropertyOptional({ description: "Avatar URL of the user" })
  @IsUrl()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({ description: "Bio of the user" })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: "Phone number of the user" })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class UpdateUserProfileDto {
  @ApiPropertyOptional({ description: "First name of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  first_name?: string;

  @ApiPropertyOptional({ description: "Last name of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  last_name?: string;

  @ApiPropertyOptional({ description: "Email address of the user" })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  email?: string;

  @ApiPropertyOptional({ description: "Username of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  username?: string;

  @ApiPropertyOptional({ description: "Avatar URL of the user" })
  @IsUrl()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  avatar_url?: string;

  @ApiPropertyOptional({ description: "Bio of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  bio?: string;

  @ApiPropertyOptional({ description: "Phone number of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  phone?: string;
}

export class OnboardUserProfileDto {
  @ApiProperty({ description: "Email address of the user" })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  email: string;

  @ApiPropertyOptional({ description: "Avatar URL of the user" })
  @IsUrl()
  @IsOptional()
  @Transform(({ value }) => (value?.trim() === "" ? undefined : value?.trim()))
  avatar_url?: string;

  @ApiProperty({ description: "First name of the user" })
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @Transform(({ value }) => value?.trim())
  first_name: string;

  @ApiProperty({ description: "Last name of the user" })
  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @Transform(({ value }) => value?.trim())
  last_name: string;

  @ApiProperty({ description: "Username of the user" })
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  @Transform(({ value }) => value?.trim())
  username: string;

  @ApiPropertyOptional({ description: "Bio of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  bio?: string;

  @ApiPropertyOptional({ description: "Phone number of the user" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  phone?: string;
}

export class UserProfileResponseDto {
  @ApiProperty({
    example: "b9f19b82-450d-4998-9684-3fb3864df632",
    description: "Unique identifier of the user",
  })
  id: string;

  @ApiProperty({
    example: "John",
    description: "First name of the user",
  })
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Last name of the user",
    nullable: true,
  })
  last_name: string | null;

  @ApiProperty({
    example: "johndoe@mail.com",
    description: "Email address of the user",
  })
  email: string;

  @ApiProperty({
    example: "codeghinux",
    description: "Username of the user",
  })
  username: string;

  @ApiProperty({
    example: null,
    description: "Avatar URL of the user",
    nullable: true,
  })
  avatar_url: string | null;

  @ApiProperty({
    example: null,
    description: "Bio of the user",
    nullable: true,
  })
  bio: string | null;

  @ApiProperty({
    example: null,
    description: "Phone number of the user",
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    example: 0,
    description: "Number of posts by the user",
  })
  number_of_posts: number;

  @ApiProperty({
    example: 0,
    description: "Number of videos by the user",
  })
  number_of_videos: number;

  @ApiProperty({
    example: 1,
    description: "Number of followers of the user",
  })
  number_of_followers: number;

  @ApiProperty({
    example: 0,
    description: "Number of users the user is following",
  })
  number_of_following: number;

  @ApiProperty({
    example: "2024-11-11T12:44:00.463Z",
    description: "Last update timestamp of the user profile",
  })
  updated_at: string;
}

export class OnboardUserProfileStatusResponseDto {
  @ApiProperty({
    example: true,
    description: "Status of the current user",
  })
  onboarded: boolean;
}
