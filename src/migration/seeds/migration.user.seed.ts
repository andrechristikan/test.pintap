import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Command({
        command: 'insert:user',
        describe: 'insert users',
    })
    async insert(): Promise<void> {
        try {
            const passwordString = 'aaAA@@123';
            const password = await this.authService.createPassword(
                passwordString
            );
            const username = 'testuser';
            const name = 'name user test';

            await this.userService.create(
                {
                    password: passwordString,
                    username,
                    name,
                },
                password,
                { _id: '235c37e7-1bb8-4a7b-8d81-aa6d55b17037' }
            );
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:user',
        describe: 'remove users',
    })
    async remove(): Promise<void> {
        try {
            await this.userService.deleteOneById(
                '235c37e7-1bb8-4a7b-8d81-aa6d55b17037'
            );
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
