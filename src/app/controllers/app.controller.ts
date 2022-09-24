import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppHelloSerialization } from 'src/app/serializations/app.hello.serialization';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperService } from 'src/common/helper/services/helper.service';
import { ENUM_LOGGER_ACTION } from 'src/common/logger/constants/logger.enum.constant';
import { Logger } from 'src/common/logger/decorators/logger.decorator';
import { RequestTimezone } from 'src/common/request/decorators/request.decorator';
import { Response } from 'src/common/response/decorators/response.decorator';
import { IResponse } from 'src/common/response/interfaces/response.interface';

@ApiTags('hello')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/',
})
export class AppController {
    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService,
        private readonly helperService: HelperService
    ) {}

    @Response('app.hello', { classSerialization: AppHelloSerialization })
    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['test'] })
    @Get('/hello')
    async hello(@RequestTimezone() timezone: string): Promise<IResponse> {
        const serviceName = this.configService.get<string>('app.name');
        const newDate = this.helperDateService.create({
            timezone: timezone,
        });

        return {
            metadata: {
                properties: {
                    serviceName,
                },
            },
            date: newDate,
            format: this.helperDateService.format(newDate, {
                timezone: timezone,
            }),
            timestamp: this.helperDateService.timestamp({
                date: newDate,
                timezone: timezone,
            }),
        };
    }
}
