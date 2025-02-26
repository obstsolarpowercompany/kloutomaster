import { User } from '../../user/entities/user.entity';
export declare class TokenData {
    access_token: string;
    refresh_token: string;
}
export declare class AuthResponseDto {
    status_code: string;
    message: string;
    access_token: string;
    data: object;
}
export declare class ConfirmEmailResponseDto {
    status_code: string;
    message: string;
    data: User;
}
export declare class RefreshTokenResponseDto {
    status_code: string;
    message: string;
    data: TokenData;
}
