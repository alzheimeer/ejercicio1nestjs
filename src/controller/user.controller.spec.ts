import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../core/services/users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue('Expected User Creation Result'),
            getUserMainAddress: jest.fn().mockResolvedValue('Expected Main Address Result'),
            updateUserAddresses: jest.fn().mockResolvedValue('Expected Address Update Result'),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call UsersService.createUser and return the result', async () => {
      const createUserDto: CreateUserDto = {
        // Propiedades del DTO según su definición
      };

      expect(await controller.createUser(createUserDto)).toBe('Expected User Creation Result');
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getUserMainAddress', () => {
    it('should call UsersService.getUserMainAddress and return the result', async () => {
      const userId = 'someUserId';

      expect(await controller.getUserMainAddress(userId)).toBe('Expected Main Address Result');
      expect(service.getUserMainAddress).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateUserAddresses', () => {
    it('should call UsersService.updateUserAddresses and return the result', async () => {
      const userId = 'someUserId';
      const updateUserDto: UpdateUserDto = {
        // Lista de UpdateUserDto según su definición
      };

      expect(await controller.updateUserAddresses(userId, updateUserDto)).toBe('Expected Address Update Result');
      expect(service.updateUserAddresses).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  // Aquí se pueden añadir más pruebas para otros endpoints según sea necesario
});
