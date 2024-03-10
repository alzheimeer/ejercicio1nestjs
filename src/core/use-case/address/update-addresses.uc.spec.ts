import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAddressesUsecase } from './update-addresses.uc';
import { UpdateAddressesUsecaseImpl } from './impl/update-addresses.uc.impl';
import { AddressRepository } from '../../data-provider/repository/address.repository';
import { UpdateAddressDto } from '../../dto/update-address.dto';

describe('UpdateAddressesUsecase', () => {
  let usecase: UpdateAddressesUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAddressesUsecaseImpl,
        {
          provide: AddressRepository,
          useValue: {
            updateAddress: jest.fn().mockImplementation((id, dto: UpdateAddressDto) => Promise.resolve({ ...dto, id })),
            // Asumiendo otros métodos necesarios mockeados aquí
          },
        },
      ],
    }).compile();

    usecase = module.get<UpdateAddressesUsecase>(UpdateAddressesUsecaseImpl);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should update addresses for a user', async () => {
    const userId = 'someUserId';
    const updateAddressDtos: UpdateAddressDto[] = [
      {
        id: 'addressId1',
        addressLine: 'New Address Line 1',
        city: 'New City 1',
        // Más campos según sea necesario
      },
      // Más direcciones según sea necesario
    ];
    const result = await usecase.execute(userId, updateAddressDtos);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result[0].addressLine).toEqual(updateAddressDtos[0].addressLine);
    // Verificar otros campos según sea necesario
  });

  // Aquí podrías añadir más pruebas para casos de borde, como direcciones no encontradas, errores esperados, etc.
});
