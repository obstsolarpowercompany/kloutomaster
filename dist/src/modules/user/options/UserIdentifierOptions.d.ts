type UserIdentifierOptionsType = {
    identifierType: 'id';
    identifier: string;
} | {
    identifierType: 'email';
    identifier: string;
} | {
    identifierType: 'username';
    identifier: string;
};
export default UserIdentifierOptionsType;
