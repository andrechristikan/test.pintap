import { IAuthPassword } from 'src/common/auth/interfaces/auth.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseDeleteOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
} from 'src/common/database/interfaces/database.interface';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import { UserUpdateDto } from 'src/modules/user/dtos/user.update.dto';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';

export interface IUserService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<UserDocument[]>;

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDocument>;

    findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDocument>;

    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<number>;

    create(
        data: UserCreateDto,
        passwordHash: IAuthPassword,
        options?: IDatabaseCreateOptions
    ): Promise<UserDocument>;

    deleteOneById(
        _id: string,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument>;

    deleteOne(
        find: Record<string, any>,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument>;

    updateOneById(
        _id: string,
        data: UserUpdateDto,
        options?: IDatabaseOptions
    ): Promise<UserDocument>;

    checkExist(
        username: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean>;

    payloadSerialization(data: UserDocument): Promise<UserPayloadSerialization>;
}
