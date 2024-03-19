import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service.impl';
import { IUserUc } from '../../../core/use-case/user.uc';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { jest } from '@jest/globals';
import { IUser } from 'src/core/entity/user.interface';

describe('UserService', () => {
  let userService: UserService;
  let userUcMock: jest.Mocked<IUserUc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserUc,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserAndMainAddress: jest.fn(),
            updateAddresses: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userUcMock = module.get<IUserUc>(IUserUc) as jest.Mocked<IUserUc>;
  });

  it('debería crear un usuario correctamente', async () => {
    const createUserDto = {
      name: 'Juan Perez',
      documentNumber: '52489658',
      documentType: 'CC',
      addresses: [
        {
          address: 'Calle 23 4-96',
          isActive: true,
          isPrimary: true,
        },
        {
          address: 'Carrera 56 6-9',
          isActive: false,
          isPrimary: false,
        },
      ],
    };
  
    const expectedUserResponse = {
      success: true,
      status: 201,
      message: 'Usuario creado correctamente.',
      data: {
        id: 'id-único',
        name: 'Juan Perez',
        documentNumber: '52489658',
        documentType: 'CC',
        addresses: [
          {
            id: 'address1',
            address: 'Calle 23 4-96',
            isActive: true,
            isPrimary: true,
          },
          {
            id: 'address2',
            address: 'Carrera 56 6-9',
            isActive: false,
            isPrimary: false,
          },
        ],
      },
    };
    userUcMock.createUser.mockResolvedValue(expectedUserResponse.data);
    const result = await userService.createUser(createUserDto);
    expect(result).toEqual(expectedUserResponse);
    expect(userUcMock.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('debería obtener todos los usuarios correctamente', async () => {
    const usersData = [
      { 
        id: '1', 
        name: 'Test User 1', 
        documentNumber: '12345678',
        documentType: 'CC',
        addresses: [
          {
            id: 'address1',
            address: 'Calle Falsa 123',
            isActive: true,
            isPrimary: true,
          }
        ]
      },
      { 
        id: '2', 
        name: 'Test User 2', 
        documentNumber: '87654321',
        documentType: 'CC',
        addresses: [
          {
            id: 'address2',
            address: 'Avenida Siempreviva 742',
            isActive: true,
            isPrimary: true,
          }
        ]
      }
    ];
    const expectedServiceResponse = {
      success: true,
      status: 200,
      message: 'Todos los usuarios obtenidos correctamente.',
      data: usersData
    };
    userUcMock.getAllUsers.mockResolvedValue(usersData);
    const result = await userService.getAllUsers();
    expect(result).toEqual(expectedServiceResponse);
    expect(userUcMock.getAllUsers).toHaveBeenCalled();
  });

  it('debería obtener un usuario y su dirección principal correctamente', async () => {
    const userId = '123';
    const expectedServiceResponse = {
      success: true,
      status: 200,
      message: 'Usuario encontrado.',
      data: {
        id: userId,
        name: 'Test User',
        documentNumber: '123456789',
        documentType: 'CC',
        addresses: [{
          id: 'address1',
          address: 'Main St',
          isActive: true,
          isPrimary: true,
        }],
      }
    };
    userUcMock.getUserAndMainAddress.mockResolvedValue(expectedServiceResponse.data);
    const result = await userService.getUserAndMainAddress(userId);
    expect(result).toEqual(expectedServiceResponse);
    expect(userUcMock.getUserAndMainAddress).toHaveBeenCalledWith(userId);
  });

  it('debería actualizar las direcciones de un usuario correctamente', async () => {
    const userId = '123';
    const updateAddressDtos: UpdateAddressDto[] = [{
      id: 'addressId',
      address: 'New Address',
      isActive: true,
      isPrimary: true,
    }];
    const expectedResponse = {
      success: true,
      status: 200,
      message: "Direcciones actualizadas correctamente.",
      data: true,
    };
    userUcMock.updateAddresses.mockResolvedValue(true);
    await expect(userService.updateAddresses(userId, updateAddressDtos)).resolves.toEqual(expectedResponse);
    expect(userUcMock.updateAddresses).toHaveBeenCalledWith(userId, updateAddressDtos);
  });

  it('debería manejar errores al crear un usuario', async () => {
    const createUserDto = {
      name: 'Test User',
      documentNumber: '123456789',
      documentType: 'ID',
      addresses: [
        {
          address: '123 Test St',
          isActive: true,
          isPrimary: true,
        },
      ],
    };
    userUcMock.createUser.mockRejectedValue(new Error('Error simulado'));
    await expect(userService.createUser(createUserDto)).rejects.toThrow('Error simulado');
    expect(userUcMock.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('debería manejar errores al obtener todos los usuarios', async () => {
    userUcMock.getAllUsers.mockRejectedValue(new Error('Error al obtener usuarios'));
    await expect(userService.getAllUsers()).rejects.toThrow('Error al obtener usuarios');
    expect(userUcMock.getAllUsers).toHaveBeenCalled();
  });

  it('debería manejar errores al obtener un usuario y su dirección principal', async () => {
    const userId = 'usuario-inexistente';
    userUcMock.getUserAndMainAddress.mockRejectedValue(new Error('Usuario no encontrado'));
    await expect(userService.getUserAndMainAddress(userId)).rejects.toThrow('Usuario no encontrado');
    expect(userUcMock.getUserAndMainAddress).toHaveBeenCalledWith(userId);
  });

  it('debería manejar errores al actualizar las direcciones de un usuario', async () => {
    const userId = '65f36d2383b7dd878dbf4a99';
    const updateAddressDtos = [
        { address: 'Nueva Dirección 1', isActive: true, isPrimary: true },
      ];
    userUcMock.updateAddresses.mockRejectedValue(new Error('Usuario no encontrado'));
    await expect(userService.updateAddresses(userId, updateAddressDtos)).rejects.toThrow('Usuario no encontrado');
    expect(userUcMock.updateAddresses).toHaveBeenCalledWith(userId, updateAddressDtos);
  });
});

