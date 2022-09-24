import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { AuthController } from 'src/common/auth/controllers/auth.controller';
import { HealthController } from 'src/health/controllers/health.controller';

@Module({
    controllers: [HealthController, AuthController],
    providers: [],
    exports: [],
    imports: [AuthModule, TerminusModule, HttpModule],
})
export class RoutesModule {}
