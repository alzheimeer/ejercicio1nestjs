import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUsecase } from './create-user.uc';
import { CreateUserUsecaseImpl } from './impl/create-user.uc.impl';
import { UserRepository } from '../../data-provider/repository/user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';

describe('CreateUserUsecase', () => {
  let usecase: CreateUserUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUsecaseImpl,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn().mockImplementation((dto: CreateUserDto) => Promise.resolve({ ...dto, id: 'generatedId' })),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateUserUsecase>(CreateUserUsecaseImpl);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      documentType: 'ID',
      documentNumber: '1234567890',
      addresses: [
        {
          addressLine: '123 Main St',
          city: 'Anytown',
          department: 'Anystate',
          country: 'AnyCountry',
          principal: true,
          active: true,
        },
      ],
    };
    const result = await usecase.execute(createUserDto);
    
    expect(result).toBeDefined();
    expect(result.id).toEqual('generatedId');
    expect(result.name).toEqual(createUserDto.name);
    // Verificar otros campos según sea necesario
  });

  // Aquí podrías añadir más pruebas para casos de error, validación de datos, etc.
});
