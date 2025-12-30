import { Injectable } from '@nestjs/common';
import { User } from '@zypherbase/shared';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  existsByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  create(data: Partial<User> & { passwordHash: string }): Promise<User> {
    return this.userRepository.create(data);
  }
}
