/**
 * Clase con la definición de operaciones a realizar en la colección coll_user y coll_address 
 * @author Carlos Mauricio Quintero 
 */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUserProvider } from '../user.provider';
import { IUser } from 'src/core/entity/user.interface';
import { UserModel } from '../model/user.model';
import { AddressModel } from '../model/address.model';
import { CreateAddressDto } from 'src/controller/dto/create-address.dto';
import Logging from 'src/common/lib/logging';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';

@Injectable()
export class UserProvider implements IUserProvider {
  private readonly logger = new Logging(UserProvider.name);
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
    @InjectModel(AddressModel.name)
    private addressModel: Model<AddressModel>,
  ) {}

  /**
   * Operación de creación de usuario, Primero crea el usuario sin direcciones
   * luego las direcciones con id vinculante, y por ultimo busca el usuario para retornarlo
   * @param {CreateUserDto} createUserDto Datos del usuario
   * @returns {Object} usuario creado
   */
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    this.logger.write("Iniciando operación de creación de usuario", Etask.CREATE_USER);
    try {
      const { addresses, ...userWithoutAddresses } = createUserDto;
      const savedUser = await this.userModel.create(userWithoutAddresses);
      const userId = savedUser._id.toString();
      if (addresses && addresses.length > 0) {
        let primaryFound = false;
        const addressesToCreate = addresses.map(address => {
          const isPrimary = address.isPrimary && !primaryFound;
          if (isPrimary) primaryFound = true;
          return {
            ...address,
            userId: userId,
            isPrimary: isPrimary
          };
        });
        if (!primaryFound && addressesToCreate.length > 0) {
          addressesToCreate[0].isPrimary = true;
        }
        await Promise.all(addressesToCreate.map(address => this.createAddress(address)));
      }
      const userCreated = await this.getUserById(userId);
      this.logger.write("Usuario creado exitosamente", Etask.CREATE_USER);
      return userCreated;
    } catch (error) {
      this.logger.write(`Error en la creación de usuario: ${error.message}`, Etask.CREATE_USER);
      throw new InternalServerErrorException(`Error al crear usuario. Por favor, intente de nuevo más tarde.`);
    }
  }
  /**
   * Operación para consultar todos los usuarios
   * Busca usuario en forma individual, luego trae las direcciones por ID,
   * y luego las agrega al usuario, por ultimo mapea a la estructura IUser
   * @returns {Object} Lista De Usuarios con todas las direcciones
   */
  async getAllUsers(): Promise<IUser[]> {
    this.logger.write("Consultando todos los usuarios", Etask.FINDALL_USER);
    try {
      const users = await this.userModel.find().lean().exec();
      const usersWithAddresses = await Promise.all(
        users.map(async (user) => {
          const addresses = await this.findAddressesByUserId(user._id.toString());
          return { ...user, addresses };
        })
      );
      this.logger.write("Consulta de todos los usuarios exitosa", Etask.FINDALL_USER);
      return usersWithAddresses.map((user) => this.toIUser(user));
    } catch (error) {
      this.logger.write(`Error en la consulta de todos los usuarios: ${error.message}`, Etask.FINDALL_USER);
      throw new InternalServerErrorException(`Error al consultar todos los usuarios. Por favor, intente de nuevo más tarde.`);
    }
  }


  /**
   * Operación para consultar un usuario
   * @param {string} userId Id usuario
   * @returns {Object} datos del usuario
   */
  async getUserById(userId: string): Promise<IUser | null> {
    this.logger.write(`Consultando usuario por ID: ${userId}`, Etask.FINDONE_USER);
    try {
      const user = await this.userModel.findById(userId).lean().exec();
      if (!user) { 
        this.logger.write(`Usuario con ID ${userId} no encontrado.`, Etask.FINDONE_USER);
        return null;
      }
      const addresses = await this.findAddressesByUserId(userId);
      const userWithAddresses = { ...user, addresses };
      this.logger.write(`Consulta de usuario por ID: ${userId} exitosa`, Etask.FINDONE_USER);
      return this.toIUser(userWithAddresses);
    } catch (error) {
      this.logger.write(`Error en la consulta de usuario por ID: ${userId}: ${error.message}`, Etask.FINDONE_USER);
      throw new InternalServerErrorException(`Error al consultar usuario por ID: ${userId}. Por favor, intente de nuevo más tarde.`);
    }
  }

  /**
   * Operación de actualización de direcciones de usuario, si viene una ya existente con id
   * Actualizar direcciones existentes o añadir nuevas, si el id existe lo encuentra la actualiza
   * Si no añade una nueva, utilizando 'as any' para evitar problemas de tipado con TypeScript
   * @param {UpdateAddressDto} updateAddressDtos arreglo con direcciones
   * @param {string} userId Id usuario
   * @returns {Object} información asociada a la actualización
   */
  async updateUserAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
    this.logger.write(`Iniciando la actualización de direcciones para el usuario: ${userId}`, Etask.UPDATE_USER);
    try {
      const userExists = await this.userModel.findById(userId).exec();
      if (!userExists) {
        this.logger.write(`Usuario con ID ${userId} no encontrado.`, Etask.UPDATE_USER);
        return null;
      }
      let primaryFound = false;
      const modifiedAddresses = updateAddressDtos.map((dto, index) => {
        if (dto.isPrimary && !primaryFound) {
          primaryFound = true;
          return dto;
        } else {
          return { ...dto, isPrimary: false };
        }
      });
      if (primaryFound) {
        await this.addressModel.updateMany({ userId: userId }, { $set: { isPrimary: false } });
        this.logger.write(`Dirección principal establecida y actualizada para el usuario: ${userId}`, Etask.UPDATE_USER);
      } else {
        this.logger.write(`No se encontró una nueva dirección principal en las direcciones proporcionadas para el usuario: ${userId}. Manteniendo la dirección principal existente.`, Etask.UPDATE_USER);
      }
      for (const dto of modifiedAddresses) {
        if (dto.id) {
          await this.addressModel.findOneAndUpdate({ _id: dto.id, userId: userId }, { ...dto }, { new: true });
        } else {
          const newAddressData = { ...dto, userId: userId };
          const newAddress = new this.addressModel(newAddressData);
          await newAddress.save();
        }
      }
      this.logger.write(`Direcciones actualizadas exitosamente para el usuario: ${userId}`, Etask.UPDATE_USER);
      return true;
    } catch (error) {
      this.logger.write(`Error al actualizar direcciones para el usuario: ${userId}: ${error.message}`, Etask.UPDATE_USER);
      throw new InternalServerErrorException(`Error al actualizar direcciones para el usuario. Por favor, intente de nuevo más tarde.`);
    }
  }

  /**
   * Transforma el objeto de usuario al formato IUser, incluyendo las direcciones
   * @param {string} user Datos De Usuario
   * @returns {Object}
   */
  private toIUser(user: any): IUser {
    return {
      id: user._id.toString(),
      name: user.name,
      documentNumber: user.documentNumber,
      documentType: user.documentType,
      addresses: user.addresses.map((address: any) => ({
        id: address._id.toString(),
        address: address.address,
        isActive: address.isActive,
        isPrimary: address.isPrimary,
      })),
    };
  }
  /**
   * Operación de búsqueda de direcciones por idusuario
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async createAddress(createAddressDto: CreateAddressDto): Promise<AddressModel> {
    this.logger.write(`Creando dirección para el usuario`, Etask.CREATE_USER_ADDRESS);
    try {
      const newAddress = await this.addressModel.create(createAddressDto);
      this.logger.write(`Dirección creada exitosamente para el usuario`, Etask.CREATE_USER_ADDRESS);
      return newAddress;
    } catch (error) {
      this.logger.write(`Error al crear dirección para el usuario ${error.message}`, Etask.CREATE_USER_ADDRESS);
      throw new InternalServerErrorException(`Error al crear direcciones para el usuario. Por favor, intente de nuevo más tarde.`);
    }
  }
  /**
   * Operación de búsqueda de direcciones por idusuario
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async findAddressesByUserId(userId: string): Promise<AddressModel[]> {
    this.logger.write(`Buscando direcciones para el usuario: ${userId}`, Etask.FINDONE_USER);
    try {
      const addresses = await this.addressModel.find({ userId }).lean().exec();
      this.logger.write(`Direcciones encontradas exitosamente para el usuario: ${userId}`, Etask.FINDONE_USER);
      return addresses;
    } catch (error) {
      this.logger.write(`Error al buscar direcciones para el usuario: ${userId}: ${error.message}`, Etask.FINDONE_USER);
      throw new InternalServerErrorException(`Error al buscar direcciones para el usuario. Por favor, intente de nuevo más tarde.`);
    }
  }
  /**
   * Operación de actualización de un usuario
   * @param {UpdateAddressDto} updateAddressDto Lista de direcciones a actualizar o crear
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async upsertAddress(updateAddressDto: UpdateAddressDto, userId: string): Promise<AddressModel> {
    this.logger.write(`Actualizando o creando dirección para el usuario: ${userId}`, Etask.UPDATE_USER_ADDRESS);
    try {
      const { id, ...updateData } = updateAddressDto;
      let address;
      if (id) {
        address = await this.addressModel.findOneAndUpdate({ _id: id, userId: userId }, updateData, { new: true }).exec();
        this.logger.write(`Dirección actualizada exitosamente para el usuario: ${userId}`, Etask.UPDATE_USER_ADDRESS);
      } else {
        const newAddressData = { ...updateData, userId: userId };
        address = new this.addressModel(newAddressData);
        await address.save();
        this.logger.write(`Dirección creada exitosamente para el usuario: ${userId}`, Etask.CREATE_USER_ADDRESS);
      }
      return address;
    } catch (error) {
      this.logger.write(`Error al actualizar o crear dirección para el usuario: ${userId}: ${error.message}`, Etask.UPDATE_USER_ADDRESS);
      throw new InternalServerErrorException(`Error al actualizar las direcciones del usuario. Por favor, intente de nuevo más tarde.`);
    }
  }
}
