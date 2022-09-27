import { PartialType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';

export class UserPayloadSerialization extends PartialType(
    UserGetSerialization
) {}
