declare const _default: (() => {
    jwtSecret: string;
    jwtRefreshSecret: string;
    jwtExpiry: string;
    jwtRefreshExpiry: string;
    refreshTokenExpiryDays: string;
    cookieExpiry: string;
    cookieSecret: string;
    saltRounds: string;
    google: {
        clientSecret: string;
        clientID: string;
        callbackURL: string;
    };
    redis: {
        host: string;
        port: string | number;
        password: string;
        username: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    jwtRefreshSecret: string;
    jwtExpiry: string;
    jwtRefreshExpiry: string;
    refreshTokenExpiryDays: string;
    cookieExpiry: string;
    cookieSecret: string;
    saltRounds: string;
    google: {
        clientSecret: string;
        clientID: string;
        callbackURL: string;
    };
    redis: {
        host: string;
        port: string | number;
        password: string;
        username: string;
    };
}>;
export default _default;
