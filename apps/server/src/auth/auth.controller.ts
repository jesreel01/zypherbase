import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {
  LoginDto,
  RegisterDto,
  RegisterResponseDto,
  UserResponseDto,
} from '@zypherbase/shared';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const { accessToken, refreshToken, user } =
      await this.authService.register(registerDto);

    return plainToInstance(RegisterResponseDto, {
      accessToken,
      refreshToken,
      user: plainToInstance(UserResponseDto, user),
    });
  }
}
