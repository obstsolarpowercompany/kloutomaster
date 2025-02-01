// @skipAuth()
// @LoginUserDocs()
// @Post('login')
// @HttpCode(200)
// async login(
//   @Body() loginDto: LoginDto,
//   @Res({ passthrough: true }) res: Response,
// ) {
//   return this.authService.loginUser(loginDto, res);
// }


// async loginUser(loginDto: LoginDto, res: any) {
//   const { email, password } = loginDto;

//   const user = await this.userService.getUserRecord({
//     identifier: email,
//     identifierType: 'email',
//   });

//   if (!user) {
//     throw new CustomHttpException(
//       SYS_MSG.INVALID_CREDENTIALS,
//       HttpStatus.UNAUTHORIZED,
//     );
//   }

//   // const isMatch = await bcrypt.compare(password, user.password);

//   // if (!isMatch) {
//   //   throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
//   // }
//   const payload = { id: user.id, sub: user.id };
//   const access_token = await this.jwtService.signAsync(payload);
//   const cookie = this.setCookie(access_token, res);
//   const responsePayload = {
//     access_token,
//     data: {
//       id: user.id,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//     },
//   };

//   return { message: SYS_MSG.LOGIN_SUCCESSFUL, ...responsePayload };
// }



