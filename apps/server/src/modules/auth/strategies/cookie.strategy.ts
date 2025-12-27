import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private authService: AuthService) {
    super({
      cookieName: 'session_id',
    });
  }
  validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
