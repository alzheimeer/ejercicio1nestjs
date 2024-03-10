// src/core/use-case/address/get-user-primary-address.uc.ts

import { Address } from '../../entity/user-address/address.entity';

export interface IGetUserPrimaryAddressUsecase {
  execute(userId: string): Promise<Address>;
}
