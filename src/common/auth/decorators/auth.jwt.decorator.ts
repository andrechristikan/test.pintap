import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant';
import { JwtGuard } from 'src/common/auth/guards/jwt/auth.jwt.guard';
import { ResponseDoc } from 'src/common/response/decorators/response.decorator';

export function AuthJwtGuard(): any {
    return applyDecorators(
        ApiBearerAuth('accessToken'),
        ResponseDoc({
            httpStatus: HttpStatus.UNAUTHORIZED,
            messagePath: 'http.clientError.unauthorized',
            statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
        }),
        UseGuards(JwtGuard)
    );
}
