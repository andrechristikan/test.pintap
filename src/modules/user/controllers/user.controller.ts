import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token, User } from 'src/common/auth/decorators/auth.decorator';
import { AuthRefreshJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthService } from 'src/common/auth/services/auth.service';
import { Response } from 'src/common/response/decorators/response.decorator';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';
import { UserLoginDto } from 'src/modules/user/dtos/user.login.dto';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { UserLoginSerialization } from 'src/modules/user/serializations/user.login.serialization';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { UserService } from 'src/modules/user/services/user.service';

@ApiTags('user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Response('user.login', {
        classSerialization: UserLoginSerialization,
    })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(
        @Body() { username, password, rememberMe }: UserLoginDto
    ): Promise<IResponse> {
        const user: UserDocument = await this.userService.findOneByUsername(
            username
        );

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const validate: boolean = await this.authService.validateUser(
            password,
            user.password
        );

        if (!validate) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(user);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();

        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(
                payload,
                rememberMe
            );
        const payloadRefreshToken: Record<string, any> =
            await this.authService.createPayloadRefreshToken(
                payload._id,
                rememberMe,
                {
                    loginDate: payloadAccessToken.loginDate,
                }
            );

        const accessToken: string = await this.authService.createAccessToken(
            payloadAccessToken
        );

        const refreshToken: string = await this.authService.createRefreshToken(
            payloadRefreshToken,
            { rememberMe }
        );

        return {
            tokenType,
            expiresIn,
            accessToken,
            refreshToken,
        };
    }

    @Response('user.refresh', { classSerialization: UserLoginSerialization })
    @AuthRefreshJwtGuard()
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    async refresh(
        @User()
        { _id, rememberMe, loginDate }: Record<string, any>,
        @Token() refreshToken: string
    ): Promise<IResponse> {
        const user: UserDocument = await this.userService.findOneById(_id);

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(user);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();

        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(
                payload,
                rememberMe,
                {
                    loginDate,
                }
            );
        const accessToken: string = await this.authService.createAccessToken(
            payloadAccessToken
        );

        return {
            tokenType,
            expiresIn,
            accessToken,
            refreshToken,
        };
    }
}
