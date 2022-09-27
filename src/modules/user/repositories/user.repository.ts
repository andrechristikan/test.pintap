import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoRepositoryAbstract } from 'src/common/database/abstracts/database.mongo-repository.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { IDatabaseRepositoryAbstract } from 'src/common/database/interfaces/database.repository.interface';
import { UserDocument, UserEntity } from 'src/modules/user/schemas/user.schema';

@Injectable()
export class UserRepository
    extends DatabaseMongoRepositoryAbstract<UserDocument>
    implements IDatabaseRepositoryAbstract<UserDocument>
{
    constructor(
        @DatabaseEntity(UserEntity.name)
        private readonly userModel: Model<UserDocument>
    ) {
        super(userModel);
    }
}
