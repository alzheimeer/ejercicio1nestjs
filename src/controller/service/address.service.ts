// src/controller/service/address.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { IAddressProvider } from '../../data-provider/address.provider';
import { IGetUserPrimaryAddressUsecase } from '../../core/use-case/user-address/get-user-primary-address.uc';
import { CreateAddressDto, UpdateAddressDto } from '../dto/user-address/*.dto';

@Injectable()
export class AddressService {
    constructor(
        private addressProvider: IAddressProvider, // Suponiendo inyección de dependencias
        private getUserPrimaryAddressUsecase: IGetUserPrimaryAddressUsecase, // Suponiendo inyección de dependencias
    ) {}

    async create(createAddressDto: CreateAddressDto) {
        // Implementación de lógica para crear una dirección utilizando el addressProvider
        const address = await this.addressProvider.createAddress(createAddressDto);
        return address;
    }

    async findAll() {
        // Este método necesitaría una implementación o extensión en IAddressProvider para listar todas las direcciones
    }

    async findOne(id: string) {
        // Implementación de lógica para encontrar una dirección por ID utilizando el addressProvider
        const addresses = await this.addressProvider.findAddressByUserId(id);
        if (!addresses || addresses.length === 0) {
            throw new NotFoundException(`Address for user ID "${id}" not found`);
        }
        return addresses[0]; // Retornando la primera dirección por simplificar
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        // Implementación de la lógica para actualizar una dirección
        // Esto podría requerir añadir métodos adicionales al IAddressProvider
    }
}
