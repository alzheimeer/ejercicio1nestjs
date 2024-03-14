/**
 * Clase con la definición de operaciones a realizar en la coleccion coll_user y coll_address 
 * @author Carlos Mauricio Quintero
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUserProvider } from '../user.provider';
import { IUser } from 'src/core/entity/user.interface';
import { UserModel } from '../model/user.model';
import { AddressModel } from '../model/address.model';
import { CreateAddressDto } from 'src/controller/dto/create-address.dto';

@Injectable()
export class UserProvider implements IUserProvider {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
    @InjectModel(AddressModel.name)
    private addressModel: Model<AddressModel>,
  ) {}

  /**
   * Operación de creacion de usuario, Primero crea el usuario sin direcciones,
   * luego las direcciones con id vinculante, y por ultimo busca el usuario para retornarlo
   * @param {CreateUserDto} createUserDto Datos del usuario
   * @returns {Object} usuario creado
   */
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { addresses, ...userWithoutAddresses } = createUserDto;
    const newUser = new this.userModel(userWithoutAddresses);
    const savedUser = await newUser.save();
  
    if (addresses && addresses.length > 0) {
      let primaryFound = false;
      const modifiedAddresses = addresses.map((address, index) => {
        if (address.isPrimary && !primaryFound) {
          primaryFound = true;
          return address;
        } else {
          return { ...address, isPrimary: false };
        }
      });
      if (!primaryFound) modifiedAddresses[0].isPrimary = true;
      await Promise.all(modifiedAddresses.map(async (addressDto) => {
        const updateAddressDto = {
          ...addressDto,
          userId: savedUser._id.toString(),
        };
        await this.createAddress(updateAddressDto as UpdateAddressDto);
      }));
    }
    const updatedUser = this.getUserById(savedUser._id.toString());
    return updatedUser;
  }
  /**
   * Operación para consultar todos los usuarios
   * Busca usuario en forma individual, luego trae las direcciones por ID,
   * y luego las agrega al usuario, por ultimo mapea a la estructura IUser
   * @returns {Object} Lista De Usuarios con todas las direcciones
   */
  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.find().lean().exec();
    const usersWithAddresses = await Promise.all(
      users.map(async (user) => {
        const addresses = await this.findAddressesByUserId(user._id.toString());
        return {
          ...user,
          addresses,
        };
      }),
    );
    return usersWithAddresses.map((user) => this.toIUser(user));
  }

  /**
   * Operación para consultar un usuario
   * @param {string} userId Id usuario
   * @returns {Object} datos del usuario
   */
  async getUserById(userId: string): Promise<IUser | null> {
    const user = await this.userModel.findById(userId).lean().exec();
    if (!user) return null;
    const addresses = await this.findAddressesByUserId(userId);
    const userWithAddresses = {
      ...user,
      addresses: addresses,
    };
    return this.toIUser(userWithAddresses);
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
    return true;
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
   * Operación de busqueda de direcciones por idusuario
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async createAddress(
    createAddressDto: CreateAddressDto,
  ): Promise<AddressModel> {
    const newAddress = new this.addressModel(createAddressDto);
    await newAddress.save();
    return newAddress;
  }
  /**
   * Operación de busqueda de direcciones por idusuario
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async findAddressesByUserId(userId: string): Promise<AddressModel[]> {
    return this.addressModel.find({ userId }).lean().exec();
  }
  /**
   * Operación de actualización de un usuario
   * @param {UpdateAddressDto} updateAddressDto Lista de direcciones a actualizar o crear
   * @param {string} userId Id Usuario
   * @returns {Object}
   */
  async upsertAddress(
    updateAddressDto: UpdateAddressDto,
    userId: string,
  ): Promise<AddressModel> {
    const { id, ...updateData } = updateAddressDto;
    if (id) {
      return await this.addressModel
        .findOneAndUpdate(
          { _id: id, userId: userId },
          updateData,
          { new: true },
        )
        .exec();
    } else {
      const newAddressData = { ...updateData, userId: userId };
      const newAddress = new this.addressModel(newAddressData);
      await newAddress.save();
      return newAddress;
    }
  }
}
