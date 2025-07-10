import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards, Get, Patch, Query } from "@nestjs/common";
import { Response } from "express";
import { skipAuth } from "../../../../helpers/skipAuth";
import AuthenticationService from "../../application/auth.service";
import { RegisterUserDocs, ConirmEmailDocs, ResendOTPDocs, LoginUserDocs, RefreshTokenDocs, RegisterByPhone } from "../docs/auth-swagger.doc";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ConfirmOtpDto, ResendOTPDto } from "./dto/confirm-otp.dto";
import { LoginDto } from "./dto/login.dto";
import { getRefreshToken } from "../domain/auth";
import { CreateUserWithPhoneDTO } from "./dto/phone-register-dto";

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
  @ConirmEmailDocs()
  @Post("verify-email")
  @HttpCode(200)
  async confirmEmailByOtp(@Body() confirmOtpDto: ConfirmOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.confirmEmailByOtp(confirmOtpDto, res);
  }

  @skipAuth()
  @LoginUserDocs()
  @Post("login")
  @HttpCode(200)
  async LoginUser(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @skipAuth()
  @ConirmEmailDocs()
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
  @RefreshTokenDocs()
  @Post("refresh-token")
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    // const refreshToken = req.cookies['refresh_token'] ;
    const refreshToken = getRefreshToken(req);
    console.log("Refresh Token:", refreshToken);

    return await this.authService.refreshAccessToken(refreshToken, res);
  }
}
