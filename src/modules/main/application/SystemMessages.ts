export const USER_CREATED_SUCCESSFULLY = 'User Created Successfully';
export const USER_CREATED = 'User Created Successfully';
export const FAILED_TO_CREATE_USER =
  'Error Occured while creating user, kindly try again';
export const ERROR_OCCURED = 'Error Occured Performing this request';
export const USER_ACCOUNT_EXIST = 'Account with the specified email exists';
export const USER_ACCOUNT_DOES_NOT_EXIST =
  "Account with the specified email doesn't exist";
export const UNAUTHENTICATED_MESSAGE =
  'User is currently unauthorized, kindly authenticate to continue';
export const USER_NOT_FOUND = 'User not found! Please register to continue';
export const INVALID_PASSWORD = 'Invalid password';
export const LOGIN_SUCCESSFUL = 'User Logged in successfully';
export const LOGIN_ERROR = 'An error occurred during login';
export const FORBIDDEN_ACTION =
  'You do not have the permission to perform this action';
export const RESOURCE_NOT_FOUND = (resource) => {
  return `${resource} does not exist`;
};

export const RESOURCE_FOUND = (resource) => {
  return `${resource} found successfully`;
};
export const RESOURCE_FETCHED = (resource) => {
  return `${resource} fetched successfully `;
};

export const RESOURCE_ADDED = (resource) => {
  return `${resource} added successfully `;
};

export const RESOURCE_CREATED = (resource) => {
  return `${resource} created successfully `;
};

export const RESOURCE_UPDATED = (resource) => {
  return `${resource} updated successfully `;
};
export const OTP_SENT_SUCCESSFULLY = (resource) => {
  return `${resource} OTP sent successfully`;
};

export const RESOURCE_INVALID = (resource) => {
  return `${resource} is invalid`;
};

export const RESOURCE_DELETED = (resource) => {
  return `${resource} is deleted successfully`;
};

export const RESOURCE_EXISTS = (resource) => {
  return `${resource} already exists`;
};

export const BAD_REQUEST = 'Bad request error';
export const FOLLOW_FAILED = "You can't follow yourself";
export const ALREADY_FOLLOWED = 'Already following this user';
export const OTP_VERIFIED = 'OTP verified successfully';
export const INVALID_CREDENTIALS = 'Invalid credentials';
