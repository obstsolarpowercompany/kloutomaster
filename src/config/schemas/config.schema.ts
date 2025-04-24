import * as Joi from 'joi';

export const configSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').required(),
    PROFILE: Joi.string().valid('local', 'development', 'production', 'ci', 'testing', 'staging').required(),
    PORT: Joi.number().required(),

    // Auth
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRY_TIME: Joi.string(),
    JWT_REFRESH_EXPIRY_TIMEFRAME: Joi.string().required(),
    JWT_REFRESH_EXPIRY_DAYS: Joi.string().required(),
    COOKIE_EXPIRY: Joi.string(),
    COOKIE_SECRETS: Joi.string().required(),
    SALT_ROUNDS: Joi.string().default(10),

    // Database
    DB_TYPE: Joi.string().default('postgres'),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),

    // Redis
    REDIS_HOST: Joi.string(),
    REDIS_PORT: Joi.number(),
    REDIS_PASSWORD: Joi.string(),
    REDIS_USERNAME: Joi.string(),

    // Google
    GOOGLE_CLIENT_ID: Joi.string(),
    GOOGLE_CLIENT_SECRET: Joi.string(),
    GOOGLE_REDIRECT_URI: Joi.string(),

    // SMTP
    SMTP_HOST: Joi.string(),
    SMTP_PORT: Joi.number().required(),
    SMTP_USER: Joi.string(),
    SMTP_PASSWORD: Joi.string(),
    SMTP_SERVER: Joi.string(),
    SMTP_GENERAL_HOST: Joi.string().required(),
    SMTP_GENERAL_PORT: Joi.number(),
    SMTP_GENERAL_USER: Joi.string().required(),
    SMTP_GENERAL_PASSWORD: Joi.string().required(),
    SMTP_GENERAL_HOST_SECURE: Joi.boolean().required(),

    // Stripe
    STRIPE_SECRET_KEY: Joi.string().required(),
});
