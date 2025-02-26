import { AbstractBaseEntity } from "../../../entities/base.entity";
import { User } from "../../user/entities/user.entity";
export declare class OTP extends AbstractBaseEntity {
    id: string;
    email: string;
    otp_code: string;
    attempts: number;
    expiry: Date;
    user: User;
    created_at: Date;
}
