import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { MessageEnumController } from 'src/common/message/controllers/message.enum.controller';

@Module({
    controllers: [MessageEnumController],
    providers: [],
    exports: [],
    imports: [AuthModule],
})
export class RoutesEnumModule {}
