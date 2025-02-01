declare const _default: (() => {
    port: number;
    smtp: {
        host: string;
        port: string;
        password: string;
        user: string;
        server: string;
        generalHost: string;
        generalPort: string;
        generalSecure: string;
        generalUser: string;
        generalPassword: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    smtp: {
        host: string;
        port: string;
        password: string;
        user: string;
        server: string;
        generalHost: string;
        generalPort: string;
        generalSecure: string;
        generalUser: string;
        generalPassword: string;
    };
}>;
export default _default;
