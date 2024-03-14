import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUserUc } from '../user.uc';
import { IUser } from '../../../core/entity/user.interface';
import { IUserProvider } from 'src/data-provider/user.provider';

@Injectable()
export class UserUcImpl implements IUserUc {
    constructor(
        private userProvider: IUserProvider // Inyecta IUserProvider
    ) {}

    /**
    * Usa userProvider para crear el usuario
    */
    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        return await this.userProvider.createUser(createUserDto);
    }

    /**
    * Usa userProvider para obtener todos los usuarios con todas sus direcciones.
    */
    async getAllUsers(): Promise<IUser[]> {
        return await this.userProvider.getAllUsers();
    }

    /**
    * Usa userProvider para obtener un usuario requerido con solo la direccion activa
    */
    async getUserAndMainAddress(userId: string): Promise<IUser> {
        const user = await this.userProvider.getUserById(userId);
        if (!user) { 
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
        }
        user.addresses = user.addresses.filter(address => address.isPrimary && address.isActive);
        return user;
    }

    /**
    * Usa userProvider para actualizar las direcciones del usuario
    */
    async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
        return await this.userProvider.updateUserAddresses(userId, updateAddressDtos);
    }
}