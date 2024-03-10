// src/core/use-case/user/impl/crear-usuario.uc.impl.ts

import { Injectable } from '@nestjs/common';
import { ICrearUsuarioUsecase } from '../user/create-user.uc';
import { CreateUserDto } from '../../../controller/dto/user-address/create-user.dto';
import { User } from '../../entity/user-address/user.entity';
import { UserRepository } from '../../../data-provider/repository/user.repository'; // Asumiendo la existencia de este repositorio

@Injectable()
export class CrearUsuarioUsecaseImpl implements ICrearUsuarioUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    // Aquí iría la lógica para mapear de CreateUserDto a la entidad User
    newUser.name = createUserDto.name;
    // Asumiendo que CreateUserDto y User tienen propiedades similares

    // Lógica adicional para manejar direcciones, validaciones, etc.

    return this.userRepository.create(newUser);
  }
}
