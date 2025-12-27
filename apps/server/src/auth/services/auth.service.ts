import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, User } from '@zypherbase/shared';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: JwtTokenService,
  ) {}

  public login(loginDto: LoginDto) {
    /**
     * TODO: Implement login logic
     */
  }

  public async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const existingUser = await this.usersService.existsByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const user = await this.usersService.create({
      email: registerDto.email,
      passwordHash: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
    });

    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
