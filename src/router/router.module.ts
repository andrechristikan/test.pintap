import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/health/controllers/health.controller';

@Module({
    providers: [],
    exports: [],
    controllers: [HealthController],
    imports: [TerminusModule, HttpModule],
})
export class RouterModule {}
