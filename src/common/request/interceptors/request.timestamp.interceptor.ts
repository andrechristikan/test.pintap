import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperNumberService } from 'src/common/helper/services/helper.number.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

@Injectable()
export class RequestTimestampInterceptor
    implements NestInterceptor<Promise<any>>
{
    constructor(
        private readonly helperDateService: HelperDateService,
        private readonly helperNumberService: HelperNumberService
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<any> | string>> {
        if (context.getType() === 'http') {
            const request: IRequestApp = context.switchToHttp().getRequest();
            const { headers } = request;
            const reqTs: string = headers['x-timestamp'] as string;
            const currentTimestamp: number = this.helperDateService.timestamp();

            const newTimestamp = reqTs || `${currentTimestamp}`;
            request.headers['x-timestamp'] = newTimestamp;
            request.timestamp = this.helperNumberService.create(newTimestamp);
        }

        return next.handle();
    }
}
