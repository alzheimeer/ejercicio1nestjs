/**
 * Clase abstracta para realizar las respectivas operaciones de usuarios
 * @author Carlos Mauricio Quintero
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export abstract class IUserService {
    /**
    * Creación de Usuario
    * @param {CreateUserDto} createUser Parámetros
    */
    abstract createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    /**
    * Consulta de todos los usuarios
    */
    abstract getAllUsers(): Promise<UserResponseDto>;
    /**
    * Consulta por Id 
    * @param {string} userId Identificador del usuario
    */
    abstract getUserAndMainAddress(userId: string): Promise<UserResponseDto>;
    /**
    * Creación de Usuario
    * @param {string} userId  Identificador del usuario
    * @param {UpdateAddressDto[]} updateAddressDtos  Lista de direcciones
    */
    abstract updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<UserResponseDto>;
}  