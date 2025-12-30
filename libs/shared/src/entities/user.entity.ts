export class User {
  id!: string;
  email!: string;
  passwordHash!: string;
  firstName!: string;
  lastName!: string;
  phone?: string;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
