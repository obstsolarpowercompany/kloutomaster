export declare class UserDto {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}
export declare class DataDto {
    user: UserDto;
}
export declare class LoginResponseDto {
    message: string;
    data: DataDto;
    access_token: string;
}
