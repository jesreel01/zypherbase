import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '@zypherbase/database';
import { User } from '@zypherbase/shared';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);

    if (result.length === 0) return null;

    return new User({
      id: result[0].id,
      email: result[0].email,
      passwordHash: result[0].password,
      firstName: result[0].firstName,
      lastName: result[0].lastName,
      phone: result[0].phone ?? undefined,
    });
  }

  async create(data: Partial<User> & { passwordHash: string }): Promise<User> {
    const [result] = await this.db
      .insert(schema.users)
      .values({
        email: data.email!,
        password: data.passwordHash,
        firstName: data.firstName!,
        lastName: data.lastName!,
        phone: data.phone,
      })
      .returning();

    return new User({
      id: result.id,
      email: result.email,
      passwordHash: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
      phone: result.phone ?? undefined,
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
