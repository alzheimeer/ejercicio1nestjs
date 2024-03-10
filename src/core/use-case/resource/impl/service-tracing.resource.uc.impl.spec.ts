import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTracingUcimpl } from './service-tracing.resource.uc.impl';
import { IServiceTracingProvider } from 'src/data-provider/service-tracing.provider';

describe('ServiceTracingUcimpl', () => {
  let serviceTracingUc: ServiceTracingUcimpl;
  let mockServiceTracingProvider: jest.Mocked<IServiceTracingProvider>;

  beforeEach(async () => {
    mockServiceTracingProvider = {
      createServiceTracing: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceTracingUcimpl,
        { provide: IServiceTracingProvider, useValue: mockServiceTracingProvider },
      ],
    }).compile();

    serviceTracingUc = module.get<ServiceTracingUcimpl>(ServiceTracingUcimpl);
  });

  describe('createServiceTracing', () => {
    it('should call createServiceTracing method of serviceTracingProvider with the given serviceTracing', async () => {
      const serviceTracing = { /* mock service tracing object */ };

      await serviceTracingUc.createServiceTracing(serviceTracing);

      expect(mockServiceTracingProvider.createServiceTracing).toHaveBeenCalledWith(serviceTracing);
    });
  });
});