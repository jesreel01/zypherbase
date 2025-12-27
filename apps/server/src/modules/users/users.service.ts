import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@zypherbase/shared';

@Injectable()
export class UsersService {
  existsByEmail(emailksflkk: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(null);
  }

  create(data: Partial<User>): Promise<User> {
    return Promise.resolve(null as unknown as User);
  }
}
