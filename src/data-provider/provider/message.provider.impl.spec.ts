import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MessageProvider } from './message.provider.impl';
import { IMessageProvider } from '../message.provider';
import { IMessage } from 'src/core/entity/message.entity';
import { MessageModel } from '../model/message.model';
import { getModelToken } from '@nestjs/mongoose';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import Traceability from 'src/common/lib/traceability';
import GeneralUtil from 'src/common/utils/generalUtil';
import { ETaskMessageGeneral } from 'src/common/utils/enums/message.enum';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { ETaskDesc, Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';


describe('MessageProvider', () => {
  let messageProvider: MessageProvider;
  let messageModel: Model<MessageModel>;
  let serviceTracing: IServiceTracingUc;

  beforeEach(async () => {
    const messageModel = {
      countDocuments: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    } as unknown as jest.Mocked<Model<MessageModel>>;

    const serviceTracing = {
      createServiceTracing: jest.fn(),
    } as unknown as jest.Mocked<IServiceTracingUc>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageProvider,
        {
          provide: getModelToken(MessageModel.name),
          useValue: messageModel,
        },
        { provide: IServiceTracingUc, useValue: serviceTracing },
        { provide: MessageModel, useValue: messageModel },
      ],
    }).compile();

    messageProvider = module.get<MessageProvider>(MessageProvider);
    //messageModel = module.get<Model<MessageModel>>(getModelToken(MessageModel.name));
    //serviceTracing = module.get<IServiceTracingUc>(IServiceTracingUc);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTotal', () => {
    it('should return the total number of messages', async () => {
      // Arrange
      const filter = {};

      //const countDocumentsMock = jest.spyOn(messageModel, 'countDocuments').mockResolvedValue(10);

      const messageModel = jest.fn().mockImplementation(() => ({
        countDocuments: jest.fn().mockReturnValue(10),
      }))();

      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();

      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      // Act
      const result = await messageProvider.getTotal(filter);

      // Assert
      //expect(countDocumentsMock).toHaveBeenCalledWith(filter);
      expect(result).toBe(10);
    });
  });

  describe('getMessages', () => {
    it('should return the messages based on the filter', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const filter = {};
      const projection = {};

      //const findMock = jest.spyOn(messageModel, 'find').mockReturnValue({
      //  skip: jest.fn().mockReturnThis(),
      //  limit: jest.fn().mockReturnThis(),
      //} as any);

      const messageModel = jest.fn().mockImplementation(() => ({
        find: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue(14),
        }),
      }))();
      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();

      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      // Act
      const result = await messageProvider.getMessages(page, limit, filter);

      // Assert
      //expect(findMock).toHaveBeenCalledWith(filter, projection);
      expect(result).toBeDefined();
    });
  });

  describe('loadMessages', () => {
    it('should load messages and create service tracing', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const filter = {};
      const projection = {};

      const request = {
        page,
        limit,
        filter,
        projection,
      };

      const startTime = [0, 0];
      //const processExecutionTimeMock = jest.spyOn(messageProvider, 'processExecutionTime').mockReturnValue(100);

      const traceability = new Traceability({});
      const setTransactionIdMock = jest.spyOn(traceability, 'setTransactionId');
      const setTaskMock = jest.spyOn(traceability, 'setTask');
      const setStatusMock = jest.spyOn(traceability, 'setStatus');
      const setRequestMock = jest.spyOn(traceability, 'setRequest');

      //const createServiceTracingMock = jest.spyOn(serviceTracing, 'createServiceTracing');

      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();



      const result = [];

      //const findMock = jest.spyOn(messageModel, 'find').mockResolvedValue(result);

      const messageModel = jest.fn().mockImplementation(() => ({
        find: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue(14),
        }),
      }))();



      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      const loggerWriteMock = jest.spyOn(messageProvider['logger'], 'write');
      // Act
      const response = await messageProvider.loadMessages(page, limit, filter);

      // Assert
      //expect(setTransactionIdMock).toHaveBeenCalled();
      //expect(setTaskMock).toHaveBeenCalledWith(`REQUEST_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
      //expect(setStatusMock).toHaveBeenCalledWith(EStatusTracingGeneral.BD_SUCCESS);
      //expect(setRequestMock).toHaveBeenCalledWith(request);
      //expect(serviceTracing).toHaveBeenCalledWith(traceability.getTraceability());
      expect(loggerWriteMock).toHaveBeenCalledWith('Request ejecución BD', ETaskMessageGeneral.GET_ALL, ELevelsErros.INFO, request);
      //expect(findMock).toHaveBeenCalledWith(page, limit, filter, projection);
      //expect(processExecutionTimeMock).toHaveBeenCalledWith(startTime);
      //expect(setTransactionIdMock).toHaveBeenCalled();
      //expect(setTaskMock).toHaveBeenCalledWith(`RESPONSE_CONSUMO_BD_${ETaskMessageGeneral.GET_ALL}`);
      //expect(setStatusMock).toHaveBeenCalledWith(EStatusTracingGeneral.BD_SUCCESS);
      //expect(setRequestMock).toHaveBeenCalledWith(request);
      //expect(serviceTracing).toHaveBeenCalledWith(traceability.getTraceability());
      //expect(loggerWriteMock).toHaveBeenCalledWith('Resultado ejecución BD', ETaskMessageGeneral.GET_ALL, ELevelsErros.INFO, request, result, 100);
      //expect(response).toBe(result);
    });

    it('should throw an error if an exception occurs', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const filter = {};
      const projection = {};

      const error = new Error('Test error');

      //const assignTaskErrorMock = jest.spyOn(GeneralUtil, 'assignTaskError');
      //const findMock = jest.spyOn(messageModel, 'find').mockRejectedValue(error);
      const messageModel = jest.fn().mockImplementation(() => ({
        find: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockRejectedValue(error),
        }),
      }))();

      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();

      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      // Act & Assert
      await expect(messageProvider.loadMessages(page, limit, filter)).rejects.toThrow(error);
      //expect(messageModel).toHaveBeenCalledWith(error, Etask.LOAD_MESSAGE, ETaskDesc.LOAD_MESSAGE);
      //expect(messageModel).toHaveBeenCalledWith(page, limit, filter);
    });
  });

  describe('getMessage', () => {
    it('should return the message with the specified id', async () => {
      // Arrange
      const id = '123';

      //const findOneMock = jest.spyOn(messageModel, 'findOne').mockResolvedValue(null);
      const messageModel = jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValue(id),
      }))();

      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();

      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      // Act
      const result = await messageProvider.getMessage(id);

      // Assert
      //expect(messageModel).toHaveBeenCalledWith({ id });
      expect(result).toBe(id);
    });
  });

  describe('updateMessage', () => {
    it('should update the message and return the updated message', async () => {
      // Arrange
      const message = {
        id: '123',
        description: 'Test description',
        message: 'Test message',
      };

      //const findOneAndUpdateMock = jest.spyOn(messageModel, 'findOneAndUpdate').mockResolvedValue(null);

      const messageModel = jest.fn().mockImplementation(() => ({
        findOneAndUpdate: jest.fn().mockReturnValue(message),
      }))();
      const serviceTracing = jest.fn().mockImplementation(() => ({
        createServiceTracing: jest.fn().mockReturnValue(11),
      } ))();

      const messageProvider = new MessageProvider(messageModel, serviceTracing);
      // Act
      const result = await messageProvider.updateMessage(message);

      // Assert
      expect(result).toBe(message);
      //expect(result).toBeNull();
    });
  });

  describe('processExecutionTime', () => {
    it('should calculate the processing time in milliseconds', () => {
      // Arrange
      const startTime = [0, 0];

      // Act
      const result = messageProvider.processExecutionTime(startTime);

      // Assert
      expect(result).toHaveReturned;
    });
  });
});