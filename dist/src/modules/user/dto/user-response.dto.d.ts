import UserInterface from "../interfaces/UserInterface";
declare class ErrorCreateUserResponse {
    status_code: number;
    message: string;
}
declare class SuccessCreateUserResponse {
    status_code: number;
    message: string;
    data: {
        user: {
            first_name: string;
            last_name: string;
            email: string;
            created_at: Date;
        };
    };
}
declare class RequestVerificationToken {
    email: string;
}
export { ErrorCreateUserResponse, SuccessCreateUserResponse, RequestVerificationToken };
type UserResponseDTO = Partial<UserInterface>;
export default UserResponseDTO;
