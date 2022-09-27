import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { HealthController } from 'src/health/controllers/health.controller';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    providers: [],
    exports: [],
    controllers: [HealthController, UserController, UserAuthController],
    imports: [TerminusModule, HttpModule, UserModule, AuthModule],
})
export class RouterModule {}
