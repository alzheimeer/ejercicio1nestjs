import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ServiceTracingProvider } from './service-tracing.provider.impl';
import { IServiceTracingProvider } from '../service-tracing.provider';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
import { ServiceTracingModel } from '../model/service-tracing/service-tracing.model';
import { getModelToken } from '@nestjs/mongoose';

describe('ServiceTracingProvider', () => {
  let serviceTracingProvider: IServiceTracingProvider;
  let serviceTracingModel: Model<ServiceTracingModel>;

  beforeEach(async () => {
    const serviceTracingModel = {
      insertMany: jest.fn(),
    } as unknown as jest.Mocked<ServiceTracingModel>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceTracingProvider,
        {
          provide: getModelToken(ServiceTracingModel.name),
          useValue: {
            insertMany: jest.fn(),
          },
        },
        { provide: ServiceTracingModel, useValue: serviceTracingModel },
      ],
    }).compile();

    serviceTracingProvider = module.get<IServiceTracingProvider>(ServiceTracingProvider);
    //serviceTracingModel = module.get<Model<ServiceTracingModel>>(getModelToken(ServiceTracingModel.name));
  });

  afterEach(() => {
    jest.resetAllMocks
  });

  describe('createServiceTracing', () => {
    it('should insert service tracing data', async () => {
      // Arrange
      const serviceTracing: IServiceTracing = 
        {
          transactionId: 'value1',
          status: 'value1',
          origen: 'value1',
          task: 'value1',
          description: 'value1',
          request: 'value1',
          method: 'value1',
          response: 'value1',
          processingTime: 11
        }
      ;

      const serviceTracingModel = jest.fn().mockImplementation(() => ({
        insertMany: jest.fn().mockReturnValue(serviceTracing),
      }))();

      const serviceTracingProvider = new ServiceTracingProvider(serviceTracingModel);

      // Act
      await serviceTracingProvider.createServiceTracing(serviceTracing);

      // Assert
      expect(serviceTracingModel.insertMany).toHaveBeenCalledWith(serviceTracing);
    });
  });

  // Add more test cases for other methods in the ServiceTracingProvider class
});