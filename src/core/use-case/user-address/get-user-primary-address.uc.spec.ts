import { Test, TestingModule } from '@nestjs/testing';
import { GetUserPrimaryAddressUsecase } from './get-user-primary-address.uc';
import { GetUserPrimaryAddressUsecaseImpl } from './impl/get-user-primary-address.uc.impl';
import { AddressRepository } from '../../data-provider/repository/address.repository';

describe('GetUserPrimaryAddressUsecase', () => {
  let usecase: GetUserPrimaryAddressUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserPrimaryAddressUsecaseImpl,
        {
          provide: AddressRepository,
          useValue: {
            findPrimaryActiveAddress: jest.fn().mockResolvedValue({
              // Supongamos que esto devuelve la dirección principal esperada
              addressLine: '123 Main St',
              city: 'Anytown',
              // Otros campos relevantes...
            }),
          },
        },
      ],
    }).compile();

    usecase = module.get<GetUserPrimaryAddressUsecase>(GetUserPrimaryAddressUsecaseImpl);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should get primary active address for a user', async () => {
    const userId = 'someUserId';
    const result = await usecase.execute(userId);
    
    expect(result).toBeDefined();
    expect(result.addressLine).toEqual('123 Main St');
    // Verificar otros campos según sea necesario
  });

  // Aquí podrías añadir más pruebas para casos de borde, como usuarios sin dirección principal activa, errores esperados, etc.
});
