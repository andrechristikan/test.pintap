import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';

@Injectable()
export class UserPayloadDeleteGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user, user } = context.switchToHttp().getRequest();

        if (__user._id === user._id) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_CANT_DELETE_YOURSELF,
                message: 'user.error.cantDeleteYourself',
            });
        }

        return true;
    }
}
