import { Test, TestingModule } from '@nestjs/testing';
import { AddressProviderImpl } from './address.provider.impl';
import { AddressRepository } from '../../data-provider/repository/address.repository';
import { Address } from '../../core/entity/address.entity';

describe('AddressProviderImpl', () => {
  let providerImpl: AddressProviderImpl;
  let addressRepository: Partial<AddressRepository>;

  beforeEach(async () => {
    addressRepository = {
      create: jest.fn().mockImplementation((address: Address) => Promise.resolve({...address, id: 'newAddressId'})),
      findByUserId: jest.fn().mockImplementation((userId: string) => Promise.resolve([new Address()])),
      // Otros métodos mockeados según sea necesario
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressProviderImpl,
        {
          provide: AddressRepository,
          useValue: addressRepository,
        },
      ],
    }).compile();

    providerImpl = module.get<AddressProviderImpl>(AddressProviderImpl);
  });

  it('should be defined', () => {
    expect(providerImpl).toBeDefined();
  });

  it('should create an address correctly', async () => {
    const newAddress = new Address(); // Asumiendo la inicialización apropiada de la entidad
    const result = await providerImpl.createAddress(newAddress);

    expect(result).toBeDefined();
    expect(result.id).toEqual('newAddressId');
    expect(addressRepository.create).toHaveBeenCalledWith(newAddress);
  });

  it('should return addresses for a given user ID', async () => {
    const userId = 'userIdExample';
    const result = await providerImpl.findAddressByUserId(userId);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(addressRepository.findByUserId).toHaveBeenCalledWith(userId);
  });

  // Agregar más pruebas según sea necesario para cubrir todos los casos de uso y posibles errores
});
