/**
 * Implementacion del servicio
 * @author Carlos Mauricio Quintero
 */

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { UserResponseDto } from '../../dto/user-response.dto';
import { IUserService } from '../user.service';
import { IUserUc } from '../../../core/use-case/user.uc';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userUC: IUserUc) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userUC.createUser(createUserDto);
      return new UserResponseDto(true, 201, 'Usuario creado correctamente.', user);
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<UserResponseDto> {
    try {
      const users = await this.userUC.getAllUsers();
      return new UserResponseDto(true, 200, 'Todos los usuarios obtenidos correctamente.', users);
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }  
  
  async getUserAndMainAddress(userId: string): Promise<UserResponseDto> {
    try {
      const user = await this.userUC.getUserAndMainAddress(userId);
      if (!user) {
        return new UserResponseDto(false, 404, 'Usuario no encontrado');
      }
      return new UserResponseDto(true, 200, 'Usuario encontrado.', user);
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

  async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.userUC.updateAddresses(userId, updateAddressDtos);
      if (!updatedUser) {
        return new UserResponseDto(false, 404, 'No se pudo actualizar las direcciones del usuario');
      }
      return new UserResponseDto(true, 200, 'Direcciones actualizadas correctamente.', updatedUser);
    } catch (error) {
      throw new Error(`Error al actualizar direcciones: ${error.message}`);
    }
  }
}