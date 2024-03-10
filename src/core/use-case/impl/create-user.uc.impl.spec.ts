import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUsecaseImpl } from './create-user.uc.impl';
import { IUserProvider } from '../../../data-provider/provider/user.provider';
import { CreateUserDto } from '../../../controller/dto/user-address/create-user.dto';
import { User } from '../../../core/entity/user-address/user.entity';

describe('CreateUserUsecaseImpl', () => {
  let usecaseImpl: CreateUserUsecaseImpl;
  let userProvider: IUserProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUsecaseImpl,
        {
          provide: IUserProvider,
          useValue: {
            createUser: jest.fn().mockImplementation((user: User) => Promise.resolve({...user, id: '123'})),
          },
        },
      ],
    }).compile();

    usecaseImpl = module.get<CreateUserUsecaseImpl>(CreateUserUsecaseImpl);
    userProvider = module.get<IUserProvider>(IUserProvider);
  });

  it('should be defined', () => {
    expect(usecaseImpl).toBeDefined();
  });

  it('should create a user and return it', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      documentType: 'ID',
      documentNumber: '123456789',
      addresses: [
        {
          addressLine: 'Test Address Line 1',
          city: 'Test City',
          department: 'Test Department',
          country: 'Test Country',
          principal: true,
          active: true,
        },
      ],
    };

    const expectedUser: User = {
      ...createUserDto,
      id: '123', // Assuming the provider assigns this ID on creation
    };

    const result = await usecaseImpl.execute(createUserDto);

    expect(result).toEqual(expectedUser);
    expect(userProvider.createUser).toHaveBeenCalledWith(expect.any(User));
  });

  // Additional tests as needed for edge cases and error handling
});
