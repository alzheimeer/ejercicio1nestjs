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
   * Operación de creacion de usuario, Primero crea el usuario sin direcciones inicialmente
   * @param {CreateUserDto} createUserDto Datos del usuario
   * @returns {Object} informacion asociada a la creacion
   */
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    // Crea el usuario sin direcciones inicialmente
    const { addresses, ...userWithoutAddresses } = createUserDto;
    const newUser = new this.userModel(userWithoutAddresses);
    const savedUser = await newUser.save();

    // Añade las direcciones utilizando el AddressService
    if (addresses && addresses.length > 0) {
      await Promise.all(
        addresses.map(async (addressDto) => {
          const updateAddressDto = {
            ...addressDto,
            userId: savedUser._id.toString(), // Convierte el ObjectId a string si es necesario
          };
          // Suponiendo que AddressService tiene un método para manejar la creación de direcciones
          // que podría ser similar al método de upsert pero específicamente para crear nuevas direcciones
          await this.createAddress(updateAddressDto as UpdateAddressDto); // Ajusta según sea necesario
        }),
      );
    }

    // Vuelve a buscar el usuario para obtener la versión actualizada con las direcciones
    const updatedUser = this.getUserById(savedUser._id.toString());
    // const updatedUser = await this.userModel.findById(savedUser._id).lean().exec();
    return updatedUser;
  }
  /**
   * Operación para consultar todos los usuarios
   * @returns {Object} Lista De Usuarios
   */
  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.find().lean().exec();

    // Obtén las direcciones para cada usuario de forma individual
    const usersWithAddresses = await Promise.all(
      users.map(async (user) => {
        // Utiliza el AddressService para encontrar las direcciones por userId
        const addresses = await this.findAddressesByUserId(user._id.toString());
        return {
          ...user,
          addresses, // Agrega las direcciones al objeto de usuario
        };
      }),
    );

    // Mapea los usuarios a la estructura IUser esperada
    return usersWithAddresses.map((user) => this.toIUser(user));
  }

  /**
   * Operación para consultar un usuario
   * @param {string} userId Id usuario
   * @returns {Object} informacion del usuario
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
  async updateUserAddresses(
    userId: string,
    updateAddressDtos: UpdateAddressDto[],
  ): Promise<boolean> {
    for (const dto of updateAddressDtos) {
      await this.upsertAddress(dto, userId);
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
    // Si se proporciona un ID, intenta actualizar.
    if (id) {
      return await this.addressModel
        .findOneAndUpdate(
          { _id: id, userId: userId }, // Asegúrate de que la dirección pertenezca al usuario correcto.
          updateData,
          { new: true },
        )
        .exec();
    } else {
      // Para una nueva dirección, asegura que el userId esté incluido.
      const newAddressData = { ...updateData, userId: userId }; // Asume que updateData ya no incluye el id.
      const newAddress = new this.addressModel(newAddressData);
      await newAddress.save();
      return newAddress;
    }
  }
}
