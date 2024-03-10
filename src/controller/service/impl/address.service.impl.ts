import { AddressService } from '../address.service';
import { CreateAddressDto, UpdateAddressDto } from '../../dto/user-address/*.dto';

export class AddressServiceImpl extends AddressService {
  create(createAddressDto: CreateAddressDto) {
    // Implementación concreta para crear una dirección
  }

  findOne(id: number) {
    // Implementación concreta para encontrar una dirección por ID
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    // Implementación concreta para actualizar una dirección
  }
}
