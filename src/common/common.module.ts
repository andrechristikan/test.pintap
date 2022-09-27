import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/common/database/database.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { ErrorModule } from 'src/common/error/error.module';
import { ResponseModule } from 'src/common/response/response.module';
import { RequestModule } from 'src/common/request/request.module';
import { MiddlewareModule } from 'src/common/middleware/middleware.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { MessageModule } from 'src/common/message/message.module';
import Joi from 'joi';
import { ENUM_MESSAGE_LANGUAGE } from './message/constants/message.enum.constant';
import configs from 'src/configs';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid('development', 'production')
                    .default('development')
                    .required(),
                APP_LANGUAGE: Joi.string()
                    .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
                    .default('en')
                    .required(),

                HTTP_HOST: [
                    Joi.string().ip({ version: 'ipv4' }).required(),
                    Joi.valid('localhost').required(),
                ],
                HTTP_PORT: Joi.number().default(3000).required(),
                HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
                HTTP_VERSION: Joi.number().required(),

                MIDDLEWARE_TIMESTAMP_TOLERANCE: Joi.string()
                    .default('5m')
                    .required(),
                MIDDLEWARE_TIMEOUT: Joi.string().default('30s').required(),

                DOC_NAME: Joi.string().required(),
                DOC_VERSION: Joi.number().required(),

                DATABASE_HOST: Joi.any()
                    .default('mongodb://localhost:27017')
                    .required(),
                DATABASE_NAME: Joi.any().default('ack').required(),
                DATABASE_USER: Joi.any().optional(),
                DATABASE_PASSWORD: Joi.any().optional(),
                DATABASE_DEBUG: Joi.boolean().default(false).required(),
                DATABASE_OPTIONS: Joi.any().optional(),

                AUTH_JWT_SUBJECT: Joi.string().required(),
                AUTH_JWT_AUDIENCE: Joi.string().required(),
                AUTH_JWT_ISSUER: Joi.string().required(),

                AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required(),
                AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string()
                    .default('30m')
                    .required(),

                AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string()
                    .default('7d')
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED: Joi.string()
                    .default('30d')
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION:
                    Joi.string().required(),

                SERVERLESS_AWS_API_GATEWAY: Joi.string().optional(),
                SERVERLESS_AWS_PROFILE: Joi.string().optional(),
                SERVERLESS_AWS_S3_BUCKET: Joi.string().optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        DatabaseModule,
        MessageModule,
        HelperModule,
        ErrorModule,
        ResponseModule,
        RequestModule,
        MiddlewareModule,
        AuthModule,
        PaginationModule,
    ],
})
export class CommonModule {}
