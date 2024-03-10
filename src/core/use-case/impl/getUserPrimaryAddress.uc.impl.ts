// src/core/use-case/address/impl/get-user-primary-address.uc.impl.ts

import { Injectable } from '@nestjs/common';
import { IGetUserPrimaryAddressUsecase } from '../address/get-user-primary-address.uc';
import { AddressRepository } from '../../../data-provider/repository/address.repository'; // Asumiendo la existencia de este repositorio
import { Address } from '../../entity/user-address/address.entity';

@Injectable()
export class GetUserPrimaryAddressUsecaseImpl implements IGetUserPrimaryAddressUsecase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string): Promise<Address> {
    // Lógica para recuperar la dirección principal activa del usuario.
    // Asumiendo que AddressRepository tiene un método para encontrar la dirección principal activa.
    return this.addressRepository.findPrimaryActiveAddress(userId);
  }
}
