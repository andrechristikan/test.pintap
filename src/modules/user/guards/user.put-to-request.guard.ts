import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        const { user } = params;

        const check: UserDocument = await this.userService.findOneById(user);
        request.__user = check;

        return true;
    }
}
