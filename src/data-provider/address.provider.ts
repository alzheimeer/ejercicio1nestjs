import { Address } from '../core/entity/user-address/address.entity';

export abstract class IAddressProvider {
  abstract createAddress(address: Address): Promise<Address>;
  abstract findAddressByUserId(userId: string): Promise<Address[]>;
  // Otros métodos relevantes...
}
