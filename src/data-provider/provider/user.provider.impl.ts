import { Injectable } from '@nestjs/common';
import { IUserProvider } from '../user.provider';
import { User } from '../../core/entity/user-address/user.entity';

@Injectable()
export class UserProviderImpl implements IUserProvider {
  constructor(
    // Inyecta dependencias como el modelo de Mongoose o el repositorio si usas TypeORM
  ) {}

  async createUser(user: User): Promise<User> {
    // Implementación para crear un usuario
  }

  async findUserById(id: string): Promise<User | null> {
    // Implementación para encontrar un usuario por ID
  }
}
