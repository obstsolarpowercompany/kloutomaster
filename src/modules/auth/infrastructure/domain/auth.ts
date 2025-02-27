import { Request } from 'express';

export function getRefreshToken(req: Request): string | undefined {
  // Check if refresh token is present in cookies
  const refreshTokenFromCookies = req.cookies?.['refresh_token'];
  if (refreshTokenFromCookies) {
    return refreshTokenFromCookies;
  }

  // If not found in cookies, check in the X-Refresh-Token header
  const refreshTokenFromHeader = req.headers['x-refresh-token'];
  if (typeof refreshTokenFromHeader === 'string') {
    return refreshTokenFromHeader;
  }

  // If refresh token is not found in either cookies or headers, return undefined
  return undefined;
}
