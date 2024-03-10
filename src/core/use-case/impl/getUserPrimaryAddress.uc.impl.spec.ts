import { Test, TestingModule } from '@nestjs/testing';
import { GetUserPrimaryAddressUsecaseImpl } from './get-user-primary-address.uc.impl';
import { IAddressProvider } from '../../../data-provider/provider/address.provider';
import { Address } from '../../../core/entity/address.entity';

describe('GetUserPrimaryAddressUsecaseImpl', () => {
  let usecaseImpl: GetUserPrimaryAddressUsecaseImpl;
  let addressProvider: IAddressProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserPrimaryAddressUsecaseImpl,
        {
          provide: IAddressProvider,
          useValue: {
            findPrimaryActiveAddress: jest.fn().mockImplementation((userId: string) => Promise.resolve({
              id: 'primaryAddressId',
              userId: userId,
              addressLine: '123 Main St',
              city: 'Anytown',
              country: 'Country',
              principal: true,
              active: true,
            } as Address)),
          },
        },
      ],
    }).compile();

    usecaseImpl = module.get<GetUserPrimaryAddressUsecaseImpl>(GetUserPrimaryAddressUsecaseImpl);
    addressProvider = module.get<IAddressProvider>(IAddressProvider);
  });

  it('should be defined', () => {
    expect(usecaseImpl).toBeDefined();
  });

  it('should get the primary active address for a user', async () => {
    const userId = 'testUserId';
    const result = await usecaseImpl.execute(userId);

    expect(result).toBeDefined();
    expect(result.id).toEqual('primaryAddressId');
    expect(result.userId).toEqual(userId);
    expect(result.principal).toBe(true);
    expect(result.active).toBe(true);
    expect(addressProvider.findPrimaryActiveAddress).toHaveBeenCalledWith(userId);
  });

  // Additional tests as needed for edge cases and error handling
});