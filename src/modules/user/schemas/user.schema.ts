import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, versionKey: false, _id: false })
export class UserEntity {
    @Prop({
        required: false,
        index: true,
        unique: true,
    })
    _id?: string;

    @Prop({
        required: true,
        index: true,
        lowercase: true,
        unique: true,
        trim: true,
    })
    username: string;

    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
    })
    salt: string;

    @Prop({
        required: false,
    })
    deletedAt?: Date;
}

export const UserDatabaseName = 'users';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;

// Hooks
UserSchema.pre<UserDocument>('save', function (next) {
    if (!this._id) {
        this._id = uuidv4();
    }

    this.username = this.username.toLowerCase();
    this.name = this.name.toLowerCase();

    next();
});
