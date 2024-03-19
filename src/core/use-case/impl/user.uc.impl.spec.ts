import { Test, TestingModule } from '@nestjs/testing';
import { UserUcImpl } from './user.uc.impl';
import { IUserProvider } from 'src/data-provider/user.provider';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserUcImpl', () => {
  let userUc: UserUcImpl;
  let userProviderMock: Partial<IUserProvider>;

  beforeEach(async () => {
    userProviderMock = {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUserAddresses: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUcImpl,
        {
          provide: IUserProvider,
          useValue: userProviderMock,
        },
      ],
    }).compile();

    userUc = module.get<UserUcImpl>(UserUcImpl);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        documentNumber: '123456789',
        documentType: 'CC',
        addresses: [],
      };
      const expectedUser = {
        id: 'user-id',
        name: 'John Doe',
        documentNumber: '123456789',
        documentType: 'CC',
        addresses: [],
      };

      (userProviderMock.createUser as jest.MockedFunction<typeof userProviderMock.createUser>).mockResolvedValueOnce(expectedUser);

      const result = await userUc.createUser(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(userProviderMock.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const expectedUsers = [
        {
          id: 'user-id-1',
          name: 'John Doe',
          documentNumber: '123456789',
          documentType: 'CC',
          addresses: [],
        },
        {
          id: 'user-id-2',
          name: 'Jane Doe',
          documentNumber: '987654321',
          documentType: 'CC',
          addresses: [],
        },
      ];
      (userProviderMock.getAllUsers as jest.MockedFunction<typeof userProviderMock.getAllUsers>).mockResolvedValueOnce(expectedUsers);
      const result = await userUc.getAllUsers();
      expect(result).toEqual(expectedUsers);
      expect(userProviderMock.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserAndMainAddress', () => {
    it('should get a user and their main address', async () => {
      const userId = 'user-id';
      const expectedUser = {
        id: userId,
        name: 'John Doe',
        documentNumber: '123456789',
        documentType: 'CC',
        addresses: [
          {
            id: 'address-id-1',
            address: '123 Main St',
            isActive: true,
            isPrimary: true,
          },
          {
            id: 'address-id-2',
            address: '456 Oak St',
            isActive: false,
            isPrimary: false,
          },
        ],
      };
      (userProviderMock.getUserById as jest.MockedFunction<typeof userProviderMock.getUserById>).mockResolvedValueOnce(expectedUser);
      const result = await userUc.getUserAndMainAddress(userId);
      expect(result).toEqual({
        ...expectedUser,
        addresses: [
          {
            id: 'address-id-1',
            address: '123 Main St',
            isActive: true,
            isPrimary: true,
          },
        ],
      });
      expect(userProviderMock.getUserById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 'user-id';
      (userProviderMock.getUserById as jest.MockedFunction<typeof userProviderMock.getUserById>).mockResolvedValueOnce(null);
      await expect(userUc.getUserAndMainAddress(userId)).rejects.toThrow(NotFoundException);
      expect(userProviderMock.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateAddresses', () => {
    it('should update user addresses', async () => {
      const userId = 'user-id';
      const updateAddressDtos: UpdateAddressDto[] = [
        {
          id: 'address-id-1',
          address: '123 Main St',
          isActive: true,
          isPrimary: true,
        },
        {
          address: '456 Oak St',
          isActive: false,
          isPrimary: false,
        },
      ];
      (userProviderMock.updateUserAddresses as jest.MockedFunction<typeof userProviderMock.updateUserAddresses>).mockResolvedValueOnce(true);
      const result = await userUc.updateAddresses(userId, updateAddressDtos);
      expect(result).toBe(true);
      expect(userProviderMock.updateUserAddresses).toHaveBeenCalledWith(userId, updateAddressDtos);
    });
  });
});