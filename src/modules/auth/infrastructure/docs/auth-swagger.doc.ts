import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCookieAuth,
  ApiHeader,
} from "@nestjs/swagger";
import { SuccessCreateUserResponse, ErrorCreateUserResponse } from "../../../user/infrastructure/dto/user-response.dto";
import { ConfirmEmailResponseDto, RefreshTokenResponseDto } from "../controllers/dto/auth-response.dto";
import { ConfirmEmailDTO, CreateUserDTO } from "../controllers/dto/create-user.dto";
import { CreateUserWithPhoneDTO } from "../controllers/dto/phone-register-dto";

export function LoginUserDocs() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "Login a user" }),
    ApiBody({ type: CreateUserDTO })
    // ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto }),
    // ApiUnauthorizedResponse({ description: 'Invalid credentials', type: LoginErrorResponseDto })
  );
}

export function RegisterUserDocs() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "User Registration" }),
    ApiBody({ type: CreateUserDTO }),
    ApiResponse({
      status: 201,
      description: "Register a new user",
      type: SuccessCreateUserResponse,
    }),
    ApiResponse({
      status: 400,
      description: "User already exists",
      type: ErrorCreateUserResponse,
    })
  );
}

export function RegisterByPhone() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "User Registration" }),
    ApiBody({ type: CreateUserWithPhoneDTO }),
    ApiResponse({
      status: 201,
      description: "Register a new user",
      type: SuccessCreateUserResponse,
    }),
    ApiResponse({
      status: 400,
      description: "User already exists",
      type: ErrorCreateUserResponse,
    })
  );
}

export function ConirmEmailDocs() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "Confirm Email with OTP" }),
    ApiBody({ type: ConfirmEmailDTO }),
    ApiResponse({
      status: 200,
      description: "Email verified successfully",
      type: ConfirmEmailResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: "Invalid id",
      type: ErrorCreateUserResponse,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: "Not Found Error",
      type: ErrorCreateUserResponse,
    })
  );
}

export function ResendOTPDocs() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "Confirm Email with OTP" }),
    ApiBody({ type: ConfirmEmailDTO }),
    ApiResponse({
      status: 200,
      description: "Email verified successfully",
      type: ConfirmEmailResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: "Invalid id",
      type: ErrorCreateUserResponse,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: "Not Found Error",
      type: ErrorCreateUserResponse,
    })
  );
}

export function RefreshTokenDocs() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiOperation({ summary: "Refresh Access Token" }),
    ApiHeader({
      name: "X-Refresh-Token",
      description: "Refresh token to obtain a new access token",
      required: false,
    }),
    ApiCookieAuth("refresh_token"),
    ApiResponse({
      status: 200,
      description: "Access token refreshed successfully",
      type: RefreshTokenResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: "Invalid refresh token",
      type: ErrorCreateUserResponse,
    }),
    ApiUnauthorizedResponse({
      status: 401,
      description: "Unauthorized",
      type: ErrorCreateUserResponse,
    })
  );
}
