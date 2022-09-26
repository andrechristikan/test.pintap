import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './guards/jwt-refresh/auth.jwt-refresh.strategy';
import { JwtStrategy } from './guards/jwt/auth.jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
    providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
    exports: [AuthService],
    controllers: [],
    imports: [],
})
export class AuthModule {}
