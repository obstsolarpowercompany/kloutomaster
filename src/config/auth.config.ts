import { registerAs } from '@nestjs/config';
export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH,
  jwtExpiry: process.env.JWT_EXPIRY_TIME,
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY,
  refreshTokenExpiryDays: process.env.JWT_REFRESH_EXPIRY_DAYS,
  cookieExpiry: process.env.COOKIE_EXPIRY,
  cookieSecret: process.env.COOKIE_SECRETS,
  saltRounds: +process.env.SALT_ROUNDS,
  google: {
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientID: process.env.GOOGLE_CLIENT_ID,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
  },
}));
