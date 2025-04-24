import { EntityRepository, Repository } from 'typeorm';
import { OTP } from './otp.entity';

@EntityRepository(OTP)
export class OTPRepository extends Repository<OTP> {
}
