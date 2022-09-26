import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from 'src/common/common.module';
@Module({
    imports: [CommonModule, CommandModule],
    providers: [],
    exports: [],
})
export class MigrationModule {}
