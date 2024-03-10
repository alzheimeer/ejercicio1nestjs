import { Injectable } from '@nestjs/common';
import { IAddressProvider } from '../address.provider';
import { Address } from 'src/core/entity/address.entity';

@Injectable()
export class AddressProviderImpl implements IAddressProvider {
  constructor(
    // Inyecta dependencias
  ) {}

  async createAddress(address: Address): Promise<Address> {
    // Implementación para crear una dirección
  }

  async findAddressByUserId(userId: string): Promise<Address[]> {
    // Implementación para encontrar direcciones por ID de usuario
  }
}
