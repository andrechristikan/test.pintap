import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [AuthModule],
})
export class RoutesPublicModule {}
