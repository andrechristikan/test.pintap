import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserRequestDto {
    @IsNotEmpty()
    @IsUUID()
    @Type(() => String)
    user: string;
}
