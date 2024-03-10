import { Test, TestingModule } from '@nestjs/testing';
import { IAddressProvider } from './address.provider';
import { AddressProviderImpl } from './provider/address.provider.impl';
import { Address } from '../core/entity/user-address/address.entity';

describe('AddressProvider', () => {
  let provider: IAddressProvider;
  let addressRepositoryMock: Partial<AddressRepository>;

  beforeEach(async () => {
    addressRepositoryMock = {
      createAddress: jest.fn().mockImplementation((address: Address) => Promise.resolve({...address, id: 'newAddressId'})),
      findAddressByUserId: jest.fn().mockImplementation((userId: string) => Promise.resolve([new Address()])),
      // Otros métodos mockeados según sea necesario
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressProviderImpl,
        {
          provide: AddressRepository,
          useValue: addressRepositoryMock,
        },
      ],
    }).compile();

    provider = module.get<IAddressProvider>(AddressProviderImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('createAddress should create an address and return it', async () => {
    const address: Address = new Address(); // Llenar con las propiedades requeridas
    const result = await provider.createAddress(address);

    expect(result).toBeDefined();
    expect(result.id).toEqual('newAddressId');
    expect(addressRepositoryMock.createAddress).toHaveBeenCalledWith(address);
  });

  it('findAddressByUserId should return addresses for a user', async () => {
    const userId = 'userId';
    const result = await provider.findAddressByUserId(userId);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result[0]).toBeInstanceOf(Address);
    expect(addressRepositoryMock.findAddressByUserId).toHaveBeenCalledWith(userId);
  });

  // Más pruebas según se necesiten para otros casos o métodos
});
