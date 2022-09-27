import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    Query,
    InternalServerErrorException,
    BadRequestException,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthService } from 'src/common/auth/services/auth.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { UserDocParamsGet } from 'src/modules/user/constants/user.doc.constant';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';
import {
    GetUser,
    UserDeleteGuard,
    UserGetGuard,
    UserProfileGuard,
    UserUpdateGuard,
} from 'src/modules/user/decorators/user.decorator';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import { UserListDto } from 'src/modules/user/dtos/user.list.dto';
import { UserRequestDto } from 'src/modules/user/dtos/user.request.dto';
import { UserUpdateDto } from 'src/modules/user/dtos/user.update.dto';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization';
import { UserListSerialization } from 'src/modules/user/serializations/user.list.serialization';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';
import { UserService } from 'src/modules/user/services/user.service';

@ApiTags('auth.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly userService: UserService
    ) {}

    @Response('user.profile', {
        classSerialization: UserProfileSerialization,
    })
    @UserProfileGuard()
    @AuthJwtGuard()
    @Get('/profile')
    async profile(@GetUser() user: UserDocument): Promise<IResponse> {
        return user;
    }

    @ResponsePaging('user.list', {
        classSerialization: UserListSerialization,
    })
    @AuthJwtGuard()
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: UserListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };

        const users: UserDocument[] = await this.userService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.userService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: users,
        };
    }

    @Response('user.get', {
        classSerialization: UserGetSerialization,
        doc: { params: UserDocParamsGet },
    })
    @UserGetGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtGuard()
    @Get('get/:user')
    async get(@GetUser() user: UserDocument): Promise<IResponse> {
        return user;
    }

    @Response('user.create', {
        classSerialization: ResponseIdSerialization,
        doc: {
            httpStatus: HttpStatus.CREATED,
        },
    })
    @AuthJwtGuard()
    @Post('/create')
    async create(
        @Body()
        { username, password, name }: UserCreateDto
    ): Promise<IResponse> {
        const checkExist: boolean = await this.userService.checkExist(username);

        if (checkExist) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EXISTS_ERROR,
                message: 'user.error.exist',
            });
        }

        try {
            const passwordHash = await this.authService.createPassword(
                password
            );

            const create = await this.userService.create(
                { username, password, name },
                passwordHash
            );

            return {
                _id: create._id,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('user.update', {
        classSerialization: ResponseIdSerialization,
        doc: { params: UserDocParamsGet },
    })
    @UserUpdateGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtGuard()
    @Put('/update/:user')
    async update(
        @GetUser() user: UserDocument,
        @Body()
        body: UserUpdateDto
    ): Promise<IResponse> {
        try {
            await this.userService.updateOneById(user._id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return {
            _id: user._id,
        };
    }

    @Response('user.delete', { doc: { params: UserDocParamsGet } })
    @UserDeleteGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtGuard()
    @Delete('/delete/:user')
    async delete(@GetUser() user: UserDocument): Promise<void> {
        try {
            await this.userService.softDeleteOneById(user._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }
}
