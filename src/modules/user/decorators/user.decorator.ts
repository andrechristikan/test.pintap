import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    UseGuards,
} from '@nestjs/common';
import { UserPayloadDeleteGuard } from 'src/modules/user/guards/payload/user.payload.delete.guard';
import { UserPayloadPutToRequestGuard } from 'src/modules/user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';
import { UserPutToRequestGuard } from 'src/modules/user/guards/user.put-to-request.guard';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext): UserDocument => {
        const { __user } = ctx.switchToHttp().getRequest();
        return __user;
    }
);

export function UserProfileGuard(): any {
    return applyDecorators(
        UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard)
    );
}

export function UserGetGuard(): any {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserUpdateGuard(): any {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserDeleteGuard(): any {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserPayloadDeleteGuard
        )
    );
}
