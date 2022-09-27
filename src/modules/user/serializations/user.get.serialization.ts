import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class UserGetSerialization {
    @ApiProperty({ example: faker.datatype.uuid() })
    @Type(() => String)
    readonly _id: string;

    @ApiProperty({
        example: faker.internet.userName(),
    })
    readonly username: string;

    @ApiProperty({
        example: faker.name.fullName(),
    })
    readonly name: string;

    @Exclude()
    readonly password: string;

    @Exclude()
    readonly salt: string;

    @Exclude()
    readonly deleted: boolean;

    @ApiProperty({
        example: faker.date.past(),
    })
    readonly createdAt: Date;

    @ApiProperty({
        example: faker.date.past(),
    })
    readonly updatedAt: Date;

    @ApiProperty({
        example: faker.date.past(),
    })
    readonly deletedAt: Date;
}
