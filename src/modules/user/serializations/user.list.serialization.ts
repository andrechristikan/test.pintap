import { PartialType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';

export class UserListSerialization extends PartialType(UserGetSerialization) {}
