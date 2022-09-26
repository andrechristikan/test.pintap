import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from './cors/cors.middleware';
import {
    JsonBodyParserMiddleware,
    RawBodyParserMiddleware,
    TextBodyParserMiddleware,
    UrlencodedBodyParserMiddleware,
} from './body-parser/body-parser.middleware';
import {
    HttpDebuggerMiddleware,
    HttpDebuggerResponseMiddleware,
} from './http-debugger/http-debugger.middleware';
import { HelmetMiddleware } from './helmet/helmet.middleware';
import { RateLimitMiddleware } from './rate-limit/rate-limit.middleware';
import { UserAgentMiddleware } from './user-agent/user-agent.middleware';
import { RequestIdMiddleware } from './request-id/request-id.middleware';
import { ResponseTimeMiddleware } from './response-time/response-time.middleware';
import { CustomLanguageMiddleware } from './custom-language/custom-language.middleware';
import { VersionMiddleware } from './version/version.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                RequestIdMiddleware,
                JsonBodyParserMiddleware,
                TextBodyParserMiddleware,
                RawBodyParserMiddleware,
                UrlencodedBodyParserMiddleware,
                CorsMiddleware,
                HttpDebuggerResponseMiddleware,
                HttpDebuggerMiddleware,
                HelmetMiddleware,
                RateLimitMiddleware,
                UserAgentMiddleware,
                CustomLanguageMiddleware,
                ResponseTimeMiddleware,
                VersionMiddleware
            )
            .forRoutes('*');
    }
}
