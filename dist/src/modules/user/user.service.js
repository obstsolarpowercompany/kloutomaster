"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const SYS_MSG = require("../../constant/SystemMessages");
const user_entity_1 = require("./entities/user.entity");
const custom_http_filter_1 = require("../../helpers/custom-http-filter");
const otp_entity_1 = require("./entities/otp.entity");
const mailing_service_1 = require("../mailing/mailing.service");
const otp_utils_1 = require("../../utils/otp-utils");
const userProfile_entity_1 = require("./entities/userProfile.entity");
let UserService = class UserService {
    constructor(userRepository, userProfileRepo, otpRepository, mailingService, dataSource) {
        this.userRepository = userRepository;
        this.userProfileRepo = userProfileRepo;
        this.otpRepository = otpRepository;
        this.mailingService = mailingService;
        this.dataSource = dataSource;
    }
    async findAllUsers() {
        const users = await this.userRepository.find({
            relations: ['profile'],
        });
        return {
            message: 'Users fetched successfully',
            data: users,
        };
    }
    async createUser(userData, manager) {
        const newUser = new user_entity_1.User();
        Object.assign(newUser, userData);
        const { savedOtp, otpCode } = await (0, otp_utils_1.generateAndSaveOtp)(manager.getRepository(otp_entity_1.OTP), newUser.email, newUser.id);
        const savedUser = await manager.save(newUser);
        try {
            await this.mailingService.sendSignupEmail(savedUser.email, savedUser.email, otpCode);
            const newUserProfile = new userProfile_entity_1.UserProfile();
            Object.assign(newUserProfile, {
                email: savedUser.email,
                user: savedUser,
            });
            await manager.save(newUserProfile);
        }
        catch (error) {
            await manager.getRepository(user_entity_1.User).delete(savedUser.id);
            await manager.getRepository(otp_entity_1.OTP).delete(savedOtp.id);
            throw new custom_http_filter_1.CustomHttpException('Failed to send OTP email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return savedUser;
    }
    async loginUserService(loginDto, manager) {
        const user = await this.getUserRecord({
            identifier: loginDto.email,
            identifierType: 'email',
        });
        if (!user) {
            throw new custom_http_filter_1.CustomHttpException(SYS_MSG.USER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        const { savedOtp, otpCode } = await (0, otp_utils_1.generateAndSaveOtp)(manager.getRepository(otp_entity_1.OTP), user.email, user.id);
        const userProfile = user.profile;
        const first_name = userProfile?.first_name ?? user.email;
        try {
            await this.mailingService.sendLoginOtpEmail(user.email, first_name, otpCode);
        }
        catch (error) {
            await manager.getRepository(otp_entity_1.OTP).delete(savedOtp.id);
            throw new custom_http_filter_1.CustomHttpException('Failed to send OTP email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return user;
    }
    async saveOtpByEmail(email, otp) {
        await this.otpRepository.save({ email, otp, createdAt: new Date() });
    }
    async updateUserRecord(userUpdateOptions) {
        const { updatePayload, identifierOptions } = userUpdateOptions;
        const user = await this.getUserRecord(identifierOptions);
        Object.assign(user, updatePayload);
        await this.userRepository.save(user);
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        return user;
    }
    async getUserById(identifier) {
        const user = await this.userRepository.findOne({
            where: { id: identifier },
        });
        return user;
    }
    async getUserRecord(identifierOptions) {
        const { identifier, identifierType } = identifierOptions;
        const GetRecord = {
            id: async () => this.getUserById(String(identifier)),
            email: async () => this.getUserByEmail(String(identifier)),
        };
        return await GetRecord[identifierType]();
    }
    async getUserByEmailTrans(email, manager) {
        return await manager.findOne(user_entity_1.User, { where: { email } });
    }
    async updateUser(userId, updatedUserDto, user) { }
    async updateUserDetails(updateUserDto, manager) {
        const userRepo = manager
            ? manager.getRepository(user_entity_1.User)
            : this.userRepository;
        try {
            const user = await userRepo.findOne({ where: { id: updateUserDto.id } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            Object.assign(user, updateUserDto);
            return await userRepo.save(user);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: 'Bad Request',
                message: 'Failed to update user',
                status_code: common_1.HttpStatus.BAD_REQUEST,
            });
        }
    }
    async softDeleteUser(userId, authenticatedUserId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new custom_http_filter_1.CustomHttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.id !== authenticatedUserId) {
            throw new custom_http_filter_1.CustomHttpException('You are not authorized to delete this user', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.userRepository.softDelete(userId);
        return {
            status: 'success',
            message: 'Deletion in progress',
        };
    }
    async verifyOtp(email, otpCode) {
        const otpEntry = await this.otpRepository.findOne({ where: { email } });
        if (!otpEntry) {
            throw new common_1.BadRequestException('No OTP found for this email.');
        }
        if (otpEntry.otp_code !== otpCode) {
            otpEntry.attempts += 1;
            await this.otpRepository.save(otpEntry);
            if (otpEntry.attempts >= 3) {
                await this.otpRepository.delete({ email });
                throw new common_1.BadRequestException('OTP attempts exceeded. Please request a new OTP.');
            }
            throw new common_1.BadRequestException('Invalid OTP. Please try again.');
        }
        await this.otpRepository.delete({ email });
        await this.userRepository.update({ email }, { is_verified: true });
    }
    async getLastOtpByEmail(email, manager) {
        const otpRepo = manager ? manager.getRepository(otp_entity_1.OTP) : this.otpRepository;
        return await otpRepo.findOne({
            where: { email },
            order: { created_at: 'DESC' },
        });
    }
    async deleteValidatedOtp(email, manager) {
        const otpRepo = manager ? manager.getRepository(otp_entity_1.OTP) : this.otpRepository;
        await otpRepo.delete({ email });
    }
    async deleteValidated(email, manager) {
        const otpRepo = manager ? manager.getRepository(otp_entity_1.OTP) : this.otpRepository;
        await otpRepo.delete({ email });
    }
    async verifyOtpForAction(email, otp, manager) {
        const user = await this.getUserRecord({
            identifier: email,
            identifierType: 'email',
        });
        if (!user) {
            throw new custom_http_filter_1.CustomHttpException(SYS_MSG.USER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        const isValidOtp = await (0, otp_utils_1.validateOtp)(email, otp, user.id, this, manager);
        if (!isValidOtp) {
            throw new custom_http_filter_1.CustomHttpException(SYS_MSG.RESOURCE_INVALID('Otp'), common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedUser = await this.updateUserDetails({ id: user.id, is_verified: true }, manager);
        return updatedUser;
    }
    async sendOtpMail(email, first_name, otpCode) {
        try {
            await this.mailingService.sendSignupEmail(email, first_name, otpCode);
        }
        catch (error) {
            throw new custom_http_filter_1.CustomHttpException('Failed to send OTP email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(otp_entity_1.OTP)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailing_service_1.MailingService,
        typeorm_2.DataSource])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map