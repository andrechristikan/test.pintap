import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { AppLanguage } from 'src/app/constants/app.constant';
import { REQUEST_PARAM_CLASS_DTOS_META_KEY } from 'src/common/request/constants/request.constant';
import { RequestParamRawGuard } from 'src/common/request/guards/request.param.guard';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import 'dotenv/config';

export const RequestId = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { id } = ctx.switchToHttp().getRequest() as IRequestApp;
        return id;
    }
);

export const RequestTimezone = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { timezone } = ctx.switchToHttp().getRequest() as IRequestApp;
        return timezone;
    }
);

export const RequestTimestamp = createParamDecorator(
    (data: string, ctx: ExecutionContext): number => {
        const { timestamp } = ctx.switchToHttp().getRequest() as IRequestApp;
        return timestamp;
    }
);

export const RequestCustomLang = createParamDecorator(
    (data: string, ctx: ExecutionContext): string[] => {
        const { customLang } = ctx.switchToHttp().getRequest() as IRequestApp;
        return customLang;
    }
);

export function RequestParamGuard(
    ...classValidation: ClassConstructor<any>[]
): any {
    return applyDecorators(
        UseGuards(RequestParamRawGuard),
        SetMetadata(REQUEST_PARAM_CLASS_DTOS_META_KEY, classValidation)
    );
}

export function RequestHeaderDoc(): any {
    const docs = [];

    return applyDecorators(
        ApiHeader({
            name: 'x-custom-lang',
            description: 'Custom language header',
            required: false,
            schema: {
                default: AppLanguage,
                example: AppLanguage,
                type: 'string',
            },
        }),
        ApiHeader({
            name: 'x-timezone',
            description: 'Custom timezone header',
            required: false,
            schema: {
                example: 'Asia/Jakarta',
                type: 'string',
            },
        }),
        ...docs
    );
}
