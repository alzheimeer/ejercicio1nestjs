import { Test, TestingModule } from '@nestjs/testing';
import { IUserProvider } from './user.provider';
import { UserProviderImpl } from './impl/user.provider.impl';
import { UserRepository } from '../repository/user.repository';
import { User } from '../../core/entity/user.entity';

describe('UserProvider', () => {
  let provider: IUserProvider;
  let userRepositoryMock: Partial<UserRepository>;

  beforeEach(async () => {
    userRepositoryMock = {
      createUser: jest.fn().mockImplementation((user: User) => Promise.resolve({...user, id: 'newUserId'})),
      findUserById: jest.fn().mockImplementation((id: string) => Promise.resolve(new User())),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProviderImpl,
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    provider = module.get<IUserProvider>(UserProviderImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('createUser should create a user and return it', async () => {
    const user: User = new User(); // Fill in required properties
    const result = await provider.createUser(user);

    expect(result).toBeDefined();
    expect(result.id).toEqual('newUserId');
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(user);
  });

  it('findUserById should return a user by id', async () => {
    const id = 'existingUserId';
    const result = await provider.findUserById(id);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(User);
    expect(userRepositoryMock.findUserById).toHaveBeenCalledWith(id);
  });

  // More tests here...
});