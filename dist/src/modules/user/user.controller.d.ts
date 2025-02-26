import { UpdateUserDto } from './dto/update-user-dto';
import { UserPayload } from './interfaces/user-payload.interface';
import UserService from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUser(req: {
        user: UserPayload;
    }, userId: string, updatedUserDto: UpdateUserDto): Promise<void>;
    findAllUsers(): Promise<{
        message: string;
        data: import("./entities/user.entity").User[];
    }>;
    softDeleteUser(userId: string, req: any): Promise<any>;
}
