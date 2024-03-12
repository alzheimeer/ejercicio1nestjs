import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { IUserService } from '../user.service';
import { ResponseService } from '../../dto/response-service.dto';
import { IUserUc } from '../../../core/use-case/user.uc';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userUC: IUserUc) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseService> {
    try {
      const user = await this.userUC.createUser(createUserDto);
      return new ResponseService(true, 'Usuario creado correctamente.', 201, user);
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async getUserAndMainAddress(userId: string): Promise<ResponseService> {
    try {
      const user = await this.userUC.getUserAndMainAddress(userId);
      if (!user) {
        return new ResponseService(false, 'Usuario no encontrado', 404, null);
      }
      return new ResponseService(true, 'Usuario encontrado.', 200, user);
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

  async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<ResponseService> {
    try {
      const updatedUser = await this.userUC.updateAddresses(userId, updateAddressDtos);
      if (!updatedUser) {
        return new ResponseService(false, 'No se pudo actualizar las direcciones del usuario', 404, null);
      }
      return new ResponseService(true, 'Direcciones actualizadas correctamente.', 200, updatedUser);
    } catch (error) {
      throw new Error(`Error al actualizar direcciones: ${error.message}`);
    }
  }
}