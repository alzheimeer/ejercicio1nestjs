/**
 * Clase abstracta con la definición de operaciones a realizar en la coleccion coll_user 
 * @author Carlos Mauricio Quintero
 */

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto'; // Asegúrate de importar UpdateAddressDto
import { IUser } from 'src/core/entity/user.interface';

@Injectable()
export abstract class IUserProvider {
    /**
    * Operación para crear usuarios
    * @param {CreateUserDto} createUserDto Datos de usuario
    */
    abstract createUser(createUserDto: CreateUserDto): Promise<IUser>;
    /**
    * Consultar todos los usuarios
    */
    abstract getAllUsers(): Promise<IUser[]>;
    /**
    * Operación para consultar un usuario
    * @param {string} userId Id de usuario
    */
    abstract getUserById(userId: string): Promise<IUser | null>;
    /**
    * Operación para actualizar direciones de usuario
    * @param {string} userId Id de usuario
    */
    abstract updateUserAddresses(userId: string, addresses: UpdateAddressDto[]): Promise<boolean>;
}