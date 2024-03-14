import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUserProvider } from '../user.provider';
import { IUser } from 'src/core/entity/user.interface';
import { UserModel } from '../model/user.model';
import { AddressModel } from '../model/address.model';

@Injectable()
export class UserProvider implements IUserProvider {

    constructor(
        @InjectModel(UserModel.name) 
        private userModel: Model<UserModel>
    ) {}

    
    /** 
        * Operación para consultar todos los usuarios
        * @returns {Object} Lista De Usuarios
    */
    async getAllUsers(): Promise<IUser[]> {
        const users = await this.userModel.find().lean().exec();
        return users.map(user => ({
          id: user._id.toString(),
          name: user.name,
          documentNumber: user.documentNumber,
          documentType: user.documentType,
          addresses: user.addresses.map(address => ({
            id: address._id.toString(),
            address: address.address,
            isActive: address.isActive,
            isPrimary: address.isPrimary
          })),
        }));
    }

    /**
    * Operación de actualización de un mensaje
    * @param {CreateUserDto} createUserDto Datos del usuario
    * @returns {Object} informacion asociada a la creacion
    */
    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = new this.userModel(createUserDto);
        const savedUser = await newUser.save();
        return this.toIUser(savedUser);
    }

    /**
    * Operación para consultar un usuario
    * @param {string} userId Id usuario
    * @returns {Object} informacion del usuario
    */
    async getUserById(userId: string): Promise<IUser | null> {
        const user = await this.userModel.findById(userId).lean().exec();
        if (!user) return null;
        return this.toIUser(user);
    }

    /**
    * Operación de actualización de direcciones de usuario, si viene una ya existente con id
    * Actualizar direcciones existentes o añadir nuevas, si el id existe lo encuentra la actualiza
    * Si no añade una nueva, utilizando 'as any' para evitar problemas de tipado con TypeScript
    * @param {UpdateAddressDto} updateAddressDtos arreglo con direcciones
    * @param {string} userId Id usuario
    * @returns {Object} informacion asociada a la actualizacion
    */
    async updateUserAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
        const user = await this.userModel.findById(userId);
        if (!user) return false;
        updateAddressDtos.forEach(dto => {
          const existingAddressIndex = user.addresses.findIndex(address => address._id.toString() === dto.id);
          if (existingAddressIndex !== -1) {
            const existingAddress = user.addresses[existingAddressIndex];
            existingAddress.address = dto.address;
            existingAddress.isActive = dto.isActive;
            existingAddress.isPrimary = dto.isPrimary;
          } else {
            user.addresses.push({
                address: dto.address,
                isActive: dto.isActive,
                isPrimary: dto.isPrimary
            } as any);
          }
        });
        await user.save();
        return true;
    }

    /**
    * Operación de actualización de un usuario
    * @param {string} user Usuario
    * @returns {Object} 
    */
    private toIUser(user: any): IUser {
        return {
            id: user._id.toString(),
            name: user.name,
            documentNumber: user.documentNumber,
            documentType: user.documentType,
            addresses: user.addresses
        };
    }
}
 