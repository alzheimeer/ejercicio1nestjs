import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProvider } from './user.provider.impl';
import { UserModel } from '../model/user.model';
import { AddressModel } from '../model/address.model';
import { IUser } from 'src/core/entity/user.interface';

describe('UserProvider', () => {
    let userProvider: UserProvider;
    let userModelMock: jest.Mocked<Model<UserModel>>;
    let addressModelMock: jest.Mocked<Model<AddressModel>>;
  
    beforeEach(async () => {
      userModelMock = {
        find: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue([]), 
        }),
      } as any;
  
      addressModelMock = {
        find: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValue([]),
        }),
      } as any;
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserProvider,
          {
            provide: getModelToken(UserModel.name),
            useValue: userModelMock,
          },
          {
            provide: getModelToken(AddressModel.name),
            useValue: addressModelMock,
          },
        ],
      }).compile();
  
      userProvider = module.get<UserProvider>(UserProvider);
    });
  
    describe('getAllUsers', () => {
      it('should return an array of users', async () => {
        const result = await userProvider.getAllUsers();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
      });
    });

    it('should call the method without errors', async () => {
      const mockUserResult: IUser[] = [];
      userModelMock.find.mockReturnValue({
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockUserResult),
      } as any);
  
      const result = await userProvider.getAllUsers();
      expect(result).toEqual(mockUserResult);
      expect(userModelMock.find).toHaveBeenCalled();
    });
    
  });