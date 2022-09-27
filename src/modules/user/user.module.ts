import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    UserDatabaseName,
    UserEntity,
    UserSchema,
} from 'src/modules/user/schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                    collection: UserDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [UserService],
    providers: [UserService, UserRepository],
    controllers: [],
})
export class UserModule {}
