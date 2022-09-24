import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class AuthInfoSerialization {
    @ApiProperty({
        example: faker.name.firstName(),
    })
    readonly firstName: string;

    @ApiProperty({
        example: faker.name.lastName(),
    })
    readonly lastName: string;

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
