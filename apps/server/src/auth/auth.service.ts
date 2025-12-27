import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@zypherbase/shared';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public login(loginDto: LoginDto) {
    /**
     * TODO: Implement login logic
     */
  }

  public register(registerDto: RegisterDto) {
    /**
     * TODO: Implement register logic
     * 1. hash password
     * 2. create user
     * 3. generate token
     * 4. return token
     */
  }
}
