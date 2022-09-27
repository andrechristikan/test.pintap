import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IUserService } from 'src/modules/user/interfaces/user.service.interface';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseDeleteOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
} from 'src/common/database/interfaces/database.interface';
import { UserDocument, UserEntity } from 'src/modules/user/schemas/user.schema';
import { UserUpdateDto } from 'src/modules/user/dtos/user.update.dto';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import { IAuthPassword } from 'src/common/auth/interfaces/auth.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<UserDocument[]> {
        return this.userRepository.findAll<UserDocument>(find, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDocument> {
        return this.userRepository.findOneById<UserDocument>(_id, options);
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDocument> {
        return this.userRepository.findOne<UserDocument>(find, options);
    }

    async findOneByUsername(
        username: string,
        options?: IDatabaseFindOneOptions
    ) {
        return this.userRepository.findOne<UserDocument>(
            {
                username: {
                    $regex: new RegExp(username),
                    $options: 'i',
                },
            },
            options
        );
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<number> {
        return this.userRepository.getTotal(find, options);
    }

    async create(
        { username, name }: UserCreateDto,
        { passwordHash, salt }: IAuthPassword,
        options?: IDatabaseCreateOptions
    ): Promise<UserDocument> {
        const user: UserEntity = {
            username,
            name,
            password: passwordHash,
            salt,
        };

        return this.userRepository.create<UserEntity>(user, options);
    }

    async softDeleteOneById(
        _id: string,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument> {
        return this.userRepository.softDeleteOneById(_id, options);
    }

    async softDeleteOne(
        find: Record<string, any>,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument> {
        return this.userRepository.softDeleteOne(find, options);
    }

    async deleteOneById(
        _id: string,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument> {
        return this.userRepository.deleteOneById(_id, options);
    }

    async deleteOne(
        find: Record<string, any>,
        options?: IDatabaseDeleteOptions
    ): Promise<UserDocument> {
        return this.userRepository.deleteOne(find, options);
    }

    async updateOneById(
        _id: string,
        data: UserUpdateDto,
        options?: IDatabaseOptions
    ): Promise<UserDocument> {
        return this.userRepository.updateOneById<UserUpdateDto>(
            _id,
            data,
            options
        );
    }

    async checkExist(
        username: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            {
                username: {
                    $regex: new RegExp(username),
                    $options: 'i',
                },
            },
            options
        );
    }

    async payloadSerialization(
        data: UserDocument
    ): Promise<UserPayloadSerialization> {
        return plainToInstance(UserPayloadSerialization, data);
    }
}
