import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';

export interface IUserCreate extends UserCreateDto {
    salt: string;
}
