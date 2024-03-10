// src/core/use-case/user/crear-usuario.uc.ts

import { CreateUserDto } from '../../dto/create-user.dto'; // Asumiendo la existencia de este DTO
import { User } from '../../entities/user.entity';

export interface ICrearUsuarioUsecase {
  execute(createUserDto: CreateUserDto): Promise<User>;
}
