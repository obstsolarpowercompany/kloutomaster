"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_CREDENTIALS = exports.OTP_VERIFIED = exports.ALREADY_FOLLOWED = exports.FOLLOW_FAILED = exports.BAD_REQUEST = exports.RESOURCE_EXISTS = exports.RESOURCE_DELETED = exports.RESOURCE_INVALID = exports.OTP_SENT_SUCCESSFULLY = exports.RESOURCE_UPDATED = exports.RESOURCE_CREATED = exports.RESOURCE_ADDED = exports.RESOURCE_FETCHED = exports.RESOURCE_FOUND = exports.RESOURCE_NOT_FOUND = exports.FORBIDDEN_ACTION = exports.LOGIN_ERROR = exports.LOGIN_SUCCESSFUL = exports.INVALID_PASSWORD = exports.USER_NOT_FOUND = exports.UNAUTHENTICATED_MESSAGE = exports.USER_ACCOUNT_DOES_NOT_EXIST = exports.USER_ACCOUNT_EXIST = exports.ERROR_OCCURED = exports.FAILED_TO_CREATE_USER = exports.USER_CREATED = exports.USER_CREATED_SUCCESSFULLY = void 0;
exports.USER_CREATED_SUCCESSFULLY = 'User Created Successfully';
exports.USER_CREATED = 'User Created Successfully';
exports.FAILED_TO_CREATE_USER = 'Error Occured while creating user, kindly try again';
exports.ERROR_OCCURED = 'Error Occured Performing this request';
exports.USER_ACCOUNT_EXIST = 'Account with the specified email exists';
exports.USER_ACCOUNT_DOES_NOT_EXIST = "Account with the specified email doesn't exist";
exports.UNAUTHENTICATED_MESSAGE = 'User is currently unauthorized, kindly authenticate to continue';
exports.USER_NOT_FOUND = 'User not found! Please register to continue';
exports.INVALID_PASSWORD = 'Invalid password';
exports.LOGIN_SUCCESSFUL = 'User Logged in successfully';
exports.LOGIN_ERROR = 'An error occurred during login';
exports.FORBIDDEN_ACTION = 'You do not have the permission to perform this action';
const RESOURCE_NOT_FOUND = (resource) => {
    return `${resource} does not exist`;
};
exports.RESOURCE_NOT_FOUND = RESOURCE_NOT_FOUND;
const RESOURCE_FOUND = (resource) => {
    return `${resource} found successfully`;
};
exports.RESOURCE_FOUND = RESOURCE_FOUND;
const RESOURCE_FETCHED = (resource) => {
    return `${resource} fetched successfully `;
};
exports.RESOURCE_FETCHED = RESOURCE_FETCHED;
const RESOURCE_ADDED = (resource) => {
    return `${resource} added successfully `;
};
exports.RESOURCE_ADDED = RESOURCE_ADDED;
const RESOURCE_CREATED = (resource) => {
    return `${resource} created successfully `;
};
exports.RESOURCE_CREATED = RESOURCE_CREATED;
const RESOURCE_UPDATED = (resource) => {
    return `${resource} updated successfully `;
};
exports.RESOURCE_UPDATED = RESOURCE_UPDATED;
const OTP_SENT_SUCCESSFULLY = (resource) => {
    return `${resource} OTP sent successfully`;
};
exports.OTP_SENT_SUCCESSFULLY = OTP_SENT_SUCCESSFULLY;
const RESOURCE_INVALID = (resource) => {
    return `${resource} is invalid`;
};
exports.RESOURCE_INVALID = RESOURCE_INVALID;
const RESOURCE_DELETED = (resource) => {
    return `${resource} is deleted successfully`;
};
exports.RESOURCE_DELETED = RESOURCE_DELETED;
const RESOURCE_EXISTS = (resource) => {
    return `${resource} already exists`;
};
exports.RESOURCE_EXISTS = RESOURCE_EXISTS;
exports.BAD_REQUEST = 'Bad request error';
exports.FOLLOW_FAILED = "You can't follow yourself";
exports.ALREADY_FOLLOWED = 'Already following this user';
exports.OTP_VERIFIED = 'OTP verified successfully';
exports.INVALID_CREDENTIALS = 'Invalid credentials';
//# sourceMappingURL=SystemMessages.js.map