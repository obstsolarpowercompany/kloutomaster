export default class HealthController {
    home(): {
        status_code: number;
        message: string;
    };
    api(): {
        status_code: number;
        message: string;
    };
    v1(): {
        status_code: number;
        message: string;
    };
    health(): {
        status_code: number;
        message: string;
        ip: string;
    };
}
