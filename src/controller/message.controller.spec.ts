import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { IMessageService } from './service/message.service';
import { ResponseService } from './dto/response-service.dto';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';

describe('MessageController', () => {
  let controller: MessageController;
  let service: jest.Mocked<IMessageService>;
  let mockServiceTracingUc: jest.Mocked<IServiceTracingUc>;

  beforeEach(async () => {
    service = {
      update: jest.fn(),
      getById: jest.fn(),
      getMessages: jest.fn(),
    } as unknown as jest.Mocked<IMessageService>;

    mockServiceTracingUc = {
      createServiceTracing: jest.fn(),
    } as jest.Mocked<IServiceTracingUc>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: IMessageService, useValue: service },
        { provide: IServiceTracingUc, useValue: mockServiceTracingUc },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  describe('message', () => {
    it('should return a message by id', () => {
      // Arrange
      const id = 'test-id';
      const expectedResult = new ResponseService(
        true,
        'Test message',
        200,
        {},
      );

      service.getById.mockResolvedValue(expectedResult);

      // Act
      const result = controller.message(id);

      // Assert
      expect(service.getById).toHaveBeenCalledWith(id);
    });

    it('should throw a BadRequestException if id is not provided', () => {
      // Arrange
      const id = '';

      // Act & Assert
      expect(() => controller.message(id)).toThrowError('Debe indicar el identificador del mensaje.');
      expect(service.getById).not.toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return messages', async () => {
      // Arrange
      const channel = 'test-channel';
      const page = 1;
      const limit = 15;
      const filter = {};

      const expectedResult = new ResponseService(
        true,
        'La Carga ha iniciado',
        200,
        {},
      );

      service.getMessages.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.getAll(channel, page, limit, filter);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.getMessages).toHaveBeenCalledWith(page, limit, filter, channel);
    });

    it('should throw an error if service throws an error', async () => {
      // Arrange
      const channel = 'test-channel';
      const page = 1;
      const limit = 15;
      const filter = {};

      const expectedError = new Error('Test error');

      service.getMessages.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(controller.getAll(channel, page, limit, filter)).rejects.toThrow(expectedError);
      expect(service.getMessages).toHaveBeenCalledWith(page, limit, filter, channel);
    });
  });

  describe('update', () => {
    it('should update a message', () => {
      // Arrange
      const id = 'test-id';
      const message = { id: 'test-id', description: 'Test message', message: 'Test message' };
      const expectedResult = new ResponseService(
        true,
        'Message updated',
        200,
        {},
      );

      const expectValue = {
        success: true,
        message: 'suscess',
        status: 201,
        documents: 'token suscess',
        process: 'd0542610-858e-11ee-b63a-392be1944d49',
        requestTime: '2023-11-17T21:18:12+00:00',
        method: 'POST',
        origen: '/MSCommunicatInterToken/V1/Token/Validate'
    }

      service.update.mockResolvedValue(Promise.resolve(expectedResult));

      // Act
      const result = controller.update(id, message);

      // Assert
      expect(service.update).toHaveBeenCalledWith(message);
    });

    it('should throw a BadRequestException if id does not match', () => {
      // Arrange
      const id = 'test-id';
      const message = { id: 'diferente-id', description: 'Test message', message: 'Test message' };

      // Act & Assert
      expect(() => controller.update(id, message)).toThrowError('El identificador no coincide.');
      expect(service.update).not.toHaveBeenCalled();
    });
  });
});