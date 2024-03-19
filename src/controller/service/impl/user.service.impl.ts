/**
 * Implementación del servicio
 * @author Carlos Mauricio Quintero
 */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { UserResponseDto } from '../../dto/user-response.dto';
import { IUserService } from '../user.service';
import { IUserUc } from '../../../core/use-case/user.uc';
import Logging from 'src/common/lib/logging';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logging(UserService.name);
  constructor(private readonly userUC: IUserUc) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.write("Iniciando creación de usuario", Etask.CREATE_USER);
    try {
      const user = await this.userUC.createUser(createUserDto);
      this.logger.write("Usuario creado correctamente", Etask.CREATE_USER);
      return new UserResponseDto(true, 201, 'Usuario creado correctamente.', user);
    } catch (error) {
      this.logger.write(`Error al crear el usuario: ${error.message}`, Etask.CREATE_USER);
      throw new BusinessException(404, `Error al crear el usuario: ${error.message}`, false, {});
    }
  }

  async getAllUsers(): Promise<UserResponseDto> {
    this.logger.write("Consultando todos los usuarios", Etask.FINDALL_USER);
    try {
      const users = await this.userUC.getAllUsers();
      this.logger.write("Todos los usuarios obtenidos correctamente", Etask.FINDALL_USER);
      return new UserResponseDto(true, 200, 'Todos los usuarios obtenidos correctamente.', users);
    } catch (error) {
      this.logger.write(`Error al obtener todos los usuarios: ${error.message}`, Etask.FINDALL_USER);
      throw new BusinessException(404, `Error al obtener todos los usuarios: ${error.message}`, false, {});
    }
  }
 
  async getUserAndMainAddress(userId: string): Promise<UserResponseDto> {
    this.logger.write(`Consultando usuario y dirección principal para el usuario ${userId}`, Etask.FINDONE_USER);
    try {
      const user = await this.userUC.getUserAndMainAddress(userId);
      if (!user) {
        this.logger.write(`Usuario no encontrado: ${userId}`, Etask.FINDONE_USER);
        throw new BusinessException(201, `Usuario con ID ${userId} no encontrado.`, false, {});
      }
      this.logger.write(`Usuario encontrado: ${userId}`, Etask.FINDONE_USER);
      return new UserResponseDto(true, 200, 'Usuario encontrado.', user);
    } catch (error) {
      this.logger.write(`Error al obtener el usuario: ${error.message}`, Etask.FINDONE_USER);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al consultar usuario por ID: ${userId}. Por favor, intente de nuevo más tarde.`);
    }
  }

  async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<UserResponseDto> {
    this.logger.write(`Actualizando direcciones para el usuario ${userId}`, Etask.UPDATE_USER);
    try {
      const updatedUser = await this.userUC.updateAddresses(userId, updateAddressDtos);
      if (updatedUser  === null) {
        this.logger.write(`No se pudo actualizar las direcciones del usuario: ${userId}`, Etask.UPDATE_USER);
        throw new BusinessException(201, `Usuario con ID ${userId} no encontrado.`, false);
      }
      this.logger.write(`Direcciones actualizadas correctamente para el usuario ${userId}`, Etask.UPDATE_USER);
      return new UserResponseDto(true, 200, 'Direcciones actualizadas correctamente.', updatedUser);
    } catch (error) {
      this.logger.write(`Error al actualizar direcciones para el usuario ${userId}: ${error.message}`, Etask.UPDATE_USER);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(500, `No se pudo actualizar las direcciones del usuario ${userId}.`, false);
    }
  }

}
