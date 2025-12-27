import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieStrategy } from './strategies/cookie.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './services/jwt-token.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CookieStrategy, JwtTokenService],
})
export class AuthModule {}
