import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUser } from '../entity/user.interface';

@Injectable()
export abstract class IUserUc {
    /**
    * Función para crear usuario
    */
    abstract createUser(createUserDto: CreateUserDto): Promise<IUser>;
    /**
    * Función para cargar obtener todos los usuario
    */
    abstract getAllUsers(): Promise<IUser[]>;
    /**
    * Función para cargar un usuario y su dirección activa
    */
    abstract getUserAndMainAddress(userId: string): Promise<IUser>;
    /**
    * Función para actualizar direcciones de un usuario
    */
    abstract updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean>;
}