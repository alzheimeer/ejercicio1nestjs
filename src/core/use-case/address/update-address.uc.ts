// src/core/use-case/address/update-address.uc.ts

import { UpdateAddressDto } from '../../../controller/dto/user-address/update-address.dto'; // Asumiendo la existencia de este DTO
import { Address } from '../../../core/entity/user-address/address.entity';

export interface IUpdateAddressUsecase {
  execute(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<Address[]>;
}
