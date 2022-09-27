import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsPasswordStrong } from 'src/common/request/validations/request.is-password-strong.validation';

export class UserCreateDto {
    @ApiProperty({
        example: faker.internet.userName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Type(() => String)
    readonly username: string;

    @ApiProperty({
        example: faker.name.firstName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Type(() => String)
    readonly name: string;

    @ApiProperty({
        description: 'string password',
        example: `${faker.random.alphaNumeric(5).toLowerCase()}${faker.random
            .alphaNumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsNotEmpty()
    @IsPasswordStrong()
    readonly password: string;
}
