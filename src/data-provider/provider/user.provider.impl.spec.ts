import { Test, TestingModule } from '@nestjs/testing';
import { UserProviderImpl } from './user.provider.impl';
import { IUserProvider } from '../../data-provider/user.provider';
import { User } from '../../core/entity/user-address/user.entity';

describe('UserProviderImpl', () => {
  let providerImpl: UserProviderImpl;
  let userRepository: Partial<IUserProvider>;

  beforeEach(async () => {
    userRepository = {
      create: jest.fn().mockImplementation((user: User) => Promise.resolve({...user, id: 'newUserId'})),
      findById: jest.fn().mockImplementation((id: string) => Promise.resolve(new User())),
      // Otros métodos mockeados según se necesiten para la funcionalidad completa
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProviderImpl,
        {
          provide: IUserProvider,
          useValue: userRepository,
        },
      ],
    }).compile();

    providerImpl = module.get<UserProviderImpl>(UserProviderImpl);
  });

  it('should be defined', () => {
    expect(providerImpl).toBeDefined();
  });

  it('should create a user correctly and return it', async () => {
    const newUser = new User(); // Suponiendo que newUser es un objeto válido de User
    const result = await providerImpl.createUser(newUser);

    expect(result).toBeDefined();
    expect(result.id).toEqual('newUserId');
    expect(userRepository.create).toHaveBeenCalledWith(newUser);
  });

  it('should return a user by ID', async () => {
    const userId = 'testUserId';
    const result = await providerImpl.findUserById(userId);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(User);
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
  });

  // Agregar más pruebas según sea necesario para cubrir todos los métodos y casos de error
});
