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
  let messageUcimpl: MessageUcimpl;
  let messageProviderMock: jest.Mocked<IMessageProvider>;
  let serviceTracingMock: jest.Mocked<IServiceTracingUc>;

  beforeEach(() => {
    messageProviderMock = {
      getMessages: jest.fn().mockResolvedValue([{ id: '1', message: 'Test Message' }]),
      loadMessages: jest.fn().mockResolvedValue([]), // Añade mocks para los métodos faltantes
      getTotal: jest.fn().mockResolvedValue(0),
      getMessage: jest.fn().mockResolvedValue(null),
      updateMessage: jest.fn().mockResolvedValue(null),
    } as jest.Mocked<IMessageProvider>;

    serviceTracingMock = {
      // Mocks para IServiceTracingUc
    } as jest.Mocked<IServiceTracingUc>;

    messageUcimpl = new MessageUcimpl(messageProviderMock, serviceTracingMock);
  });

  describe('onModuleInit', () => {
    it('should load messages successfully', async () => {
      await messageUcimpl.onModuleInit();
      expect(MessageUcimpl.getMessages).toEqual([{ id: '1', message: 'Test Message' }]);
    });
  });
});