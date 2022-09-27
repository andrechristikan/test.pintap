import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user } = request;

        const check: UserDocument = await this.userService.findOneById(
            user._id
        );
        request.__user = check;

        return true;
    }
}
