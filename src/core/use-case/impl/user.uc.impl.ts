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

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        // Usa userProvider para crear el usuario
        return await this.userProvider.createUser(createUserDto);
    }

    async getAllUsers(): Promise<IUser[]> {
        // Usa userProvider para obtener todos los usuarios
        return await this.userProvider.getAllUsers();
    }

    async getUserAndMainAddress(userId: string): Promise<IUser> {
        const user = await this.userProvider.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
        }
        // Filtra y mantiene solo la dirección principal activa
        user.addresses = user.addresses.filter(address => address.isPrimary && address.isActive);
        return user;
    }

    async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
        // Usa userProvider para actualizar las direcciones del usuario
        return await this.userProvider.updateUserAddresses(userId, updateAddressDtos);
    }
}