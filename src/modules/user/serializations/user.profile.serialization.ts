import { PartialType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';

export class UserProfileSerialization extends PartialType(
    UserGetSerialization
) {}
