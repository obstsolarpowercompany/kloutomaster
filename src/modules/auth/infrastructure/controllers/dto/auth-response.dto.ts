import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../user/domain/entities/user.entity';

export class TokenData {
  @ApiProperty({
    description: 'The access token for accessing protected resources',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsInN1YiI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsImVtYWlsIjoibWFmYXY4NTU5MkBkYXRpbmdlbC5jb20iLCJpYXQiOjE3MzM4NTIxNjQsImV4cCI6MTczMzg5NTM2NH0.u3ScYlqgUIde1Vssyfm0Glqy0ByaAqp2pOv9M82XbSU',
  })
  access_token: string;

  @ApiProperty({
    description: 'The refresh token for obtaining a new access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsInN1YiI6ImNkNWFmNDFiLWZiOGUtNDQ4My1hYTQwLTI1NDBmZGE2MmUzYyIsImVtYWlsIjoibWFmYXY4NTU5MkBkYXRpbmdlbC5jb20iLCJpYXQiOjE3MzM4NTIxNjQsImV4cCI6MTczNTA2MTc2NH0.ZS94BIbg-K_kkmGFUbpvau_QMJYvVptb5VUQNtv4QKU',
  })
  refresh_token: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Status code of the authentication response',
    example: '201',
  })
  status_code: string;
  @ApiProperty({
    description: 'Status message of the authentication response',
    example: 'Authentication successful',
  })
  message: string;

  @ApiProperty({
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Additional data containing user object',
    type: 'object',
  })
  data: object;
}

export class ConfirmEmailResponseDto {
  @ApiProperty({
    description: 'Status code of the authentication response',
    example: '200',
  })
  status_code: string;

  @ApiProperty({
    description: 'Status message of the authentication response',
    example: 'Email verified successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Additional data containing user object',
    type: 'object',
  })
  data: User;
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Status code of the authentication response',
    example: '201',
  })
  status_code: string;

  @ApiProperty({
    description: 'Status message of the response',
    example: 'Tokens refreshed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'The data containing the tokens',
    type: TokenData,
  })
  data: TokenData;
}
