
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAddressesUsecaseImpl } from './update-addresses.uc.impl';
import { IAddressProvider } from '../../../data-provider/provider/address.provider';
import { UpdateAddressDto } from '../../../controller/dto/update-address.dto';
import { Address } from '../../../core/entity/address.entity';

describe('UpdateAddressesUsecaseImpl', () => {
  let usecaseImpl: UpdateAddressesUsecaseImpl;
  let addressProvider: IAddressProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAddressesUsecaseImpl,
        {
          provide: IAddressProvider,
          useValue: {
            updateAddress: jest.fn().mockImplementation((id, dto: UpdateAddressDto) => Promise.resolve({...dto, id})),
            // Assume more methods might be needed for complete functionality
          },
        },
      ],
    }).compile();

    usecaseImpl = module.get<UpdateAddressesUsecaseImpl>(UpdateAddressesUsecaseImpl);
    addressProvider = module.get<IAddressProvider>(IAddressProvider);
  });

  it('should be defined', () => {
    expect(usecaseImpl).toBeDefined();
  });

  it('should update an address and return the updated address', async () => {
    const updateAddressDto: UpdateAddressDto = {
      id: 'addressId',
      addressLine: 'New Address Line',
      city: 'New City',
      department: 'New Department',
      country: 'New Country',
      principal: false,
      active: true,
    };

    const expectedAddress: Address = {
      ...updateAddressDto,
    };

    const result = await usecaseImpl.execute('userId', [updateAddressDto]);

    expect(result).toEqual([expectedAddress]);
    expect(addressProvider.updateAddress).toHaveBeenCalledWith(updateAddressDto.id, updateAddressDto);
  });

  // Additional tests as needed for edge cases and error handling
});