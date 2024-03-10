import { Test, TestingModule } from '@nestjs/testing';
import { MessageUcimpl } from './message.uc.impl';
import { IMessageProvider } from '../../../data-provider/message.provider';
import { IServiceTracingUc } from '../resource/service-tracing.resource.uc';
import { IMessage } from '../../entity/message.entity';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { BusinessException } from '../../../common/lib/business-exceptions';
import { Etask, ETaskDesc } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import Logging from 'src/common/lib/logging';
import { Empty } from 'nats';
import e from 'express';

describe('MessageUcimpl', () => {
  let messageUc: MessageUcimpl;
  let messageProviderMock: jest.Mocked<IMessageProvider>;
  let serviceTracingMock: jest.Mocked<IServiceTracingUc>;

  beforeEach(async () => {
    messageProviderMock = {
      getMessages: jest.fn(),
      updateMessage: jest.fn(),
      getMessage: jest.fn(),
      loadMessages: jest.fn(),
      getTotal: jest.fn(),
    } as jest.Mocked<IMessageProvider>;

    serviceTracingMock = {} as jest.Mocked<IServiceTracingUc>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageUcimpl,
        { provide: IMessageProvider, useValue: messageProviderMock },
        { provide: IServiceTracingUc, useValue: serviceTracingMock },
      ],
    }).compile();

    messageUc = module.get<MessageUcimpl>(MessageUcimpl);
  });

  describe('onModuleInit', () => {
    it('should load messages on module initialization', async () => {
      const messages: IMessage[] = [
        { id: '1', description: 'Test message 1', message: 'Test message 1' },
        { id: '2', description: 'Test message 2', message: 'Test message 2' },
      ];
      messageProviderMock.getMessages.mockResolvedValue(messages);

      await messageUc.onModuleInit();

      expect(messageProviderMock.getMessages).toHaveBeenCalledWith(1, 100, {});
      expect(MessageUcimpl.getMessages).toEqual(messages);
    });

    it('should handle error when loading messages', async () => {
      const error = new Error('Test error');
      messageProviderMock.getMessages.mockRejectedValue(error);
      const loggerSpy = jest.spyOn(Logging.prototype, 'write');

      await messageUc.onModuleInit();

      expect(loggerSpy).toHaveBeenCalledWith(
        'Error cargando mensajes',
        Etask.LOAD_MESSAGE,
        ELevelsErros.WARNING,
        error
      );
      expect(MessageUcimpl.getMessages).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a message and return the updated message', async () => {
      const message: IMessage = { id: '1', description: 'Test message', message: 'Test message' };
      const updatedMessage: IMessage = { id: '1', description: 'Test message 1', message: 'Updated message' };
      messageProviderMock.updateMessage.mockResolvedValue(updatedMessage);

      const result = await messageUc.update(message);

      expect(messageProviderMock.updateMessage).toHaveBeenCalledWith(message);
      expect(result).toEqual(updatedMessage);
    });

    it('should throw an error if the message does not exist' , async () =>  {
      const message: IMessage = { id: '1', description: 'Test message', message: 'Test message' };
      const updatedMessage = null;
      messageProviderMock.updateMessage.mockResolvedValue(updatedMessage);
      const result = messageUc.update(message);
      expect(messageProviderMock.updateMessage).toHaveBeenCalledWith(message);

    });
  });

  describe('getById', () => {
    it('should get a message by id', async () => {
      const idMessage = '1';
      const message: IMessage = { id: '1', description: 'Test message', message: 'Test message' };
      messageProviderMock.getMessage.mockResolvedValue(message);

      const result = await messageUc.getById(idMessage);

      expect(messageProviderMock.getMessage).toHaveBeenCalledWith(idMessage);
      expect(result).toEqual(message);
    });
  });

  describe('getMessages', () => {
    it('should get messages based on the filter', async () => {
      const page = 1;
      const limit = 10;
      const filter = {};
      const documents: IMessage[] = [
        { id: '1', description: 'Test message 1', message: 'Test message 1' },
        { id: '2', description: 'Test message 2', message: 'Test message 2' },
      ];
      const responsePaginator: ResponsePaginator<IMessage> = {
        pagination: { pageIndex: 1, pageSize: 10, totalDocuments: 2 },
        data: documents,
      };
      messageProviderMock.loadMessages.mockResolvedValue(documents);

      const result = await messageUc.getMessages(page, limit, filter);

      expect(messageProviderMock.loadMessages).toHaveBeenCalledWith(page, limit, filter);
    });

    it('should throw an error if no documents are found', async () => {
      const page = 1;
      const limit = 10;
      const filter = {};
      const message: IMessage = { id: '1', description: 'Test message', message: 'Test message' };
      messageProviderMock.loadMessages.mockResolvedValue(null);
      const result = messageUc.getMessages(page, limit, filter);
      expect(messageProviderMock.loadMessages).toHaveBeenCalledWith(page, limit, filter);
    });
  });
});