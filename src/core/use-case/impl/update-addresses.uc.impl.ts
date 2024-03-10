// src/core/use-case/address/impl/update-address.uc.impl.ts

import { Injectable } from '@nestjs/common';
import { IUpdateAddressUsecase } from '../address/update-address.uc';
import { UpdateAddressDto } from '../../../controller/dto/user-address/update-address.dto';
import { AddressRepository } from '../../../data-provider/repository/address.repository'; // Asumiendo la existencia de este repositorio
import { Address } from '../../../core/entity/user-address/address.entity';

@Injectable()
export class UpdateAddressUsecaseImpl implements IUpdateAddressUsecase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<Address[]> {
    // Lógica para actualizar o insertar direcciones.
    // Asumiendo que AddressRepository tiene métodos para manejar estas operaciones.
    
    // Ejemplo simplificado:
    const addresses: Address[] = [];
    for (const dto of updateAddressDtos) {
      let address: Address;
      if (dto.id) {
        // Si el dto tiene id, se actualiza la dirección existente.
        address = await this.addressRepository.update(dto.id, dto);
      } else {
        // Si no tiene id, se crea una nueva dirección.
        address = await this.addressRepository.create(userId, dto);
      }
      addresses.push(address);
    }

    // Asegurar que solo una dirección sea la principal activa.
    // Este es un ejemplo simplificado, se necesita lógica adicional aquí.
    
    return addresses;
  }
}
