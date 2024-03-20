import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { IUserService } from './service/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: jest.Mocked<IUserService>;

  beforeEach(async () => {
    userServiceMock = {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserAndMainAddress: jest.fn(),
      updateAddresses: jest.fn(),
    };
    const serviceTracingUcMock: Partial<IServiceTracingUc> = {
      createServiceTracing: jest.fn(),
    };
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUserService,
          useValue: userServiceMock,
        },
        {
          provide: IServiceTracingUc,
          useValue: serviceTracingUcMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
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

    const expectedSuccessResponse = {
      process: 'id-de-proceso-único',
      success: true,
      status: 201,
      documents:
        'Información relevante del usuario creado o un mensaje de éxito',
      message: 'Usuario creado exitosamente.',
      requestTime: '2024-03-15T10:51:27-05:00',
      method: 'POST',
      origen: '/RSTemplateNestJS/api/v1/users',
    };
    userServiceMock.createUser.mockResolvedValue(expectedSuccessResponse);

    const result: any = await controller.createUser(createUserDto);

    expect(userServiceMock.createUser).toHaveBeenCalledWith(createUserDto);
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toEqual('Usuario creado exitosamente.');
    expect(result).toHaveProperty('process');
    expect(result).toHaveProperty('requestTime');
    expect(result.method).toEqual('POST');
    expect(result.origen).toEqual('/RSTemplateNestJS/api/v1/users');
  });

  it('debería lanzar un BadRequestException si la creación falla', async () => {
    userServiceMock.createUser.mockResolvedValue(null);
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
    await expect(controller.createUser(createUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('debería obtener todos los usuarios correctamente, independientemente de la cantidad', async () => {
    const expectedUsers: any = [
      {
        id: '65f36d2383b7dd878dbf4a99',
        name: 'Usuario Ejemplo',
        documentNumber: '80065009',
        documentType: 'CC',
        addresses: [
          {
            id: '65f36d2383b7dd878dbf4a9b',
            address: 'Dirección de Ejemplo',
            isActive: true,
            isPrimary: true,
          },
        ],
      },
    ];
    userServiceMock.getAllUsers.mockResolvedValue(expectedUsers);
    const result = await controller.getAllUsers();
    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          documentNumber: expect.any(String),
          documentType: expect.any(String),
          addresses: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              address: expect.any(String),
              isActive: expect.any(Boolean),
              isPrimary: expect.any(Boolean),
            }),
          ]),
        }),
      ]),
    );
  });

  it('debería lanzar una excepción si falla al obtener todos los usuarios', async () => {
    userServiceMock.getAllUsers.mockRejectedValue(new Error('Error interno'));
    await expect(controller.getAllUsers()).rejects.toThrow('Error interno');
  });

  it('debería obtener un usuario por ID correctamente', async () => {
    const userId = '65f36d2383b7dd878dbf4a99';
    const expectedUserData: any = {
      id: userId,
      name: '11111 Quintero',
      documentNumber: '80065009',
      documentType: 'CC',
      addresses: [
        {
          id: '65f36dba83b7dd878dbf4ac1',
          address: 'pototo',
          isActive: true,
          isPrimary: true,
        },
      ],
    };
    userServiceMock.getUserAndMainAddress.mockResolvedValue(expectedUserData);
    const result = await controller.getUser(userId);
    expect(userServiceMock.getUserAndMainAddress).toHaveBeenCalledWith(userId);
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        documentNumber: expect.any(String),
        documentType: expect.any(String),
        addresses: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            address: expect.any(String),
            isActive: expect.any(Boolean),
            isPrimary: expect.any(Boolean),
          }),
        ]),
      }),
    );
  });

  it('debería lanzar una excepción si no se encuentra un usuario por ID', async () => {
    const userId = '65f36d2383b7dd878dbf4a99';
    userServiceMock.getUserAndMainAddress.mockResolvedValue(null);
    await expect(controller.getUser(userId)).rejects.toThrow(NotFoundException);
  });
  
  it('debería actualizar las direcciones de un usuario correctamente', async () => {
    const userId = '65f36d2383b7dd878dbf4a99';
    const updateAddressDtos = [
      { address: 'Nueva Dirección 1', isActive: true, isPrimary: true },
    ];
    const expectedResponse = {
      success: true,
      status: 200,
      message: 'Direcciones actualizadas correctamente.',
      data: true,
      requestTime: expect.any(String),
      responseTime: expect.any(Number),
      method: 'PUT',
      origen: `/RSTemplateNestJS/v1/User/${userId}/addresses`,
    };
    userServiceMock.updateAddresses.mockResolvedValue(expectedResponse);
    const result = await controller.updateAddresses(userId, updateAddressDtos);
    expect(userServiceMock.updateAddresses).toHaveBeenCalledWith(
      userId,
      updateAddressDtos,
    );
    expect(result).toEqual(
      expect.objectContaining({
        success: expectedResponse.success,
        status: expectedResponse.status,
        message: expectedResponse.message,
        data: expectedResponse.data,
        requestTime: expect.any(String),
        responseTime: expect.any(Number),
        method: expect.any(String),
        origen: expect.any(String),
      }),
    );
  });

  it('debería lanzar una excepción si falla al actualizar las direcciones de un usuario', async () => {
    const userId = '65f36d2383b7dd878dbf4a99';
    const updateAddressDtos = [
      { address: 'Nueva Dirección 1', isActive: true, isPrimary: true },
    ];
    userServiceMock.updateAddresses.mockRejectedValue(new Error('Error interno'));
    await expect(controller.updateAddresses(userId, updateAddressDtos)).rejects.toThrow('Error interno');
  });

  
});
