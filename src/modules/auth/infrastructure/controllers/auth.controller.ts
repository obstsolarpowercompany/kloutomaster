import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards, Get, Patch, Query } from "@nestjs/common";
import { Response } from "express";
import { skipAuth } from "../../../../helpers/skipAuth";
import AuthenticationService from "../../application/auth.service";
import {
  RegisterUserDocs,
  ResendOTPDocs,
  LoginUserDocs,
  RefreshTokenDocs,
  RegisterByPhone,
  ConfirmEmailDocs,
  ConfirmPhoneDocs,
  ResendPhoneOTPDocs,
} from "../docs/auth-swagger.doc";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ConfirmOtpDto, ResendOTPDto } from "./dto/confirm-otp.dto";
import { LoginDto } from "./dto/login.dto";
import { getRefreshToken } from "../domain/auth";
import { CreateUserWithPhoneDTO, ResendPhoneOTPDTO, VerifyPhoneOTPDTO } from "./dto/phone-register-dto";
import { EnableTwoFactorDto, EnableTwoFactorResponseDto, ErrorResponseDto, TwoFactorResponseDto } from "./dto/two-factor-response.dto";
import { UsernameLoginDto } from "./dto/username-login.dto";

@ApiTags("Authentication")
@Controller("auth")
export default class RegistrationController {
  constructor(private authService: AuthenticationService) {}

  @skipAuth()
  @RegisterUserDocs()
  @Post("register")
  @HttpCode(201)
  public async register(@Body() body: CreateUserDTO): Promise<any> {
    return this.authService.createNewUser(body);
  }

  @skipAuth()
  @RegisterByPhone()
  @Post("register-phone")
  @HttpCode(201)
  public async PhoneRegister(@Body() body: CreateUserWithPhoneDTO): Promise<any> {
    return this.authService.createNewUserWithPhone(body);
  }

  @skipAuth()
  @ConfirmEmailDocs()
  @Post("verify-email")
  @HttpCode(200)
  async confirmEmailByOtp(@Body() confirmOtpDto: ConfirmOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.confirmEmailByOtp(confirmOtpDto, res);
  }

  @skipAuth()
  @ConfirmPhoneDocs()
  @Post("verify-phone")
  @HttpCode(200)
  async confirmPhoneByOtp(@Body() confirmOtpDto: VerifyPhoneOTPDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.confirmPhoneByOtp(confirmOtpDto, res);
  }

  @skipAuth()
  @LoginUserDocs()
  @Post("login")
  @HttpCode(200)
  async LoginUser(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @skipAuth()
  @ConfirmEmailDocs()
  @Post("verify-login")
  @HttpCode(200)
  async confirmLoginByOtp(@Body() confirmOtpDto: ConfirmOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.confirmLoginByOtp(confirmOtpDto, res);
  }

  @skipAuth()
  @ResendOTPDocs()
  @Post("resend-otp")
  @HttpCode(200)
  async resendOtp(@Body() resendOTPDto: ResendOTPDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.resendOtp(resendOTPDto, res);
  }

  @skipAuth()
  @ResendPhoneOTPDocs()
  @Post("resend-otp-phone")
  @HttpCode(200)
  async resendPhoneOtp(@Body() resendOTPDto: ResendPhoneOTPDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.resendPhoneOtp(resendOTPDto, res);
  }

  @skipAuth()
  @RefreshTokenDocs()
  @Post("refresh-token")
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    // const refreshToken = req.cookies['refresh_token'] ;
    const refreshToken = getRefreshToken(req);
    console.log("Refresh Token:", refreshToken);

    return await this.authService.refreshAccessToken(refreshToken, res);
  }

  @Get("setup-two-factor")
  @ApiOkResponse({
    description: "Returns 2FA setup details",
    type: TwoFactorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - User must be authenticated to setup 2FA",
    type: ErrorResponseDto,
  })
  async setupTwoFactorAuthentication(@Request() req) {
    return this.authService.setupTwoFactorAuthentication(req.user.id);
  }

  @ApiOkResponse({
    description: "Enables two-factor authentication for the user",
    type: EnableTwoFactorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - User must be authenticated to enable 2FA",
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad Request - Invalid Verification Code | 2FA is already enabled",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Bad Request - User not found (authenticated user does not exist in the db)",
    type: ErrorResponseDto,
  })
  @Post("enable-two-factor")
  async enableTwoFactorAuthentication(@Body() enableTwoFaDto: EnableTwoFactorDto, @Request() req) {
    return this.authService.verifyAndEnableTwoFactor(enableTwoFaDto, req.user.id);
  }

  @Post("login-with-2fa")
  @ApiOkResponse({
    description: "Logs in the user with two-factor authentication",
    type: TwoFactorResponseDto,
  })
  @skipAuth()
  async loginWithTwoFactor(@Body() loginDto: UsernameLoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginWithTwoFactor(loginDto, res);
  }
}
