import { User } from '../core/entity/user-address/user.entity';

export abstract class IUserProvider {
  abstract createUser(user: User): Promise<User>;
  abstract findUserById(id: string): Promise<User | null>;
  // Otros métodos relevantes...
}
