import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service.impl';
import { IMessageUc } from '../../../core/use-case/message.uc';
import { IGlobalValidateIService } from '../globalValidate.service';
import { IMessageDTO } from '../../dto/message/message.dto';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { IMessage } from '../../../core/entity/message.entity';

describe('MessageService', () => {
  let service: MessageService;
  let messageUCMock: jest.Mocked<IMessageUc>;
  let globalValidateServiceMock: jest.Mocked<IGlobalValidateIService>;

  beforeEach(async () => {
    messageUCMock = {
      loadMessages: jest.fn(),
      update: jest.fn(),
      getById: jest.fn(),
      getMessages: jest.fn(),
    } as jest.Mocked<IMessageUc>;

    globalValidateServiceMock = {
      validateChannel: jest.fn(),
    } as jest.Mocked<IGlobalValidateIService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: IMessageUc, useValue: messageUCMock },
        { provide: IGlobalValidateIService, useValue: globalValidateServiceMock },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  describe('update', () => {
    it('should update a message and return a response', async () => {
      const message: IMessageDTO = { id: 'test-id', description: 'Test message', message: 'Test message' };
      const expectedResult = Promise.resolve({
        id: 'test-id', 
        description: 'Test description',     
        success: true,
        message: 'suscess',
        status: 201,
        process: 'd0542610-858e-11ee-b63a-392be1944d49',
        requestTime: '2023-11-17T21:18:12+00:00',
        method: 'POST',
        origen: '/MSCommunicatInterToken/V1/Token/Validate'
      });

      messageUCMock.update.mockResolvedValue(expectedResult);

      const result = await service.update(message);

      expect(messageUCMock.update).toHaveBeenCalledWith(message);
    });
  });

  describe('getById', () => {
    it('should get a message by id and return a response', async () => {
      const idMessage = '123';
      const expectedResult = Promise.resolve({
        id: 'test-id', 
        description: 'Test description',     
        success: true,
        message: 'suscess',
        status: 201,
        process: 'd0542610-858e-11ee-b63a-392be1944d49',
        requestTime: '2023-11-17T21:18:12+00:00',
        method: 'POST',
        origen: '/MSCommunicatInterToken/V1/Token/Validate'
      });

      messageUCMock.getById.mockResolvedValue(expectedResult);

      const result = await service.getById(idMessage);

      expect(messageUCMock.getById).toHaveBeenCalledWith(idMessage);
      
    });
  });

  describe('getMessages', () => {
    it('should get messages based on the filter and return a response', async () => {
      const page = 1;
      const limit = 10;
      const filter = "{}";
      const channel = 'test';
      const expectedResult = Promise.resolve({
        pagination: {
          pageIndex: 1, 
          pageSize: 10, 
          totalDocuments: 1, 
        },
        data: [
          {
            id: 'test-id', 
            description: 'Test description',     
            success: true,
            message: 'suscess',
            status: 201,
            process: 'd0542610-858e-11ee-b63a-392be1944d49',
            requestTime: '2023-11-17T21:18:12+00:00',
            method: 'POST',
            origen: '/MSCommunicatInterToken/V1/Token/Validate'
          }
        ]
      });

      globalValidateServiceMock.validateChannel.mockResolvedValue(true);
      messageUCMock.getMessages.mockResolvedValue(expectedResult);

      const result = await service.getMessages(page, limit, filter, channel);

      expect(globalValidateServiceMock.validateChannel).toHaveBeenCalledWith(channel);
      expect(messageUCMock.getMessages).toHaveBeenCalledWith(page, limit, {});
      
    });

    it('should throw an error if an exception occurs', async () => {
      const page = 1;
      const limit = 10;
      const filter = "{}";
      const channel = 'test';
      const error = new Error('Test error');

      globalValidateServiceMock.validateChannel.mockResolvedValue(true);
      messageUCMock.getMessages.mockRejectedValue(error);

      await expect(service.getMessages(page, limit, filter, channel)).rejects.toThrow(error);

      expect(globalValidateServiceMock.validateChannel).toHaveBeenCalledWith(channel);
    });
  });
});
