import { Test, TestingModule } from '@nestjs/testing';
import { ServiceErrorUcimpl } from './service-error.resource.uc.impl';
import { IServiceErrorProvider } from 'src/data-provider/service-error.provider';
import { ITaskError } from 'src/core/entity/service-error/task-error.entity';
import { IServiceTracingInicial } from 'src/core/entity/service-tracing/service-tracing.entity';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { Etask, ETaskDesc } from "src/common/utils/enums/taks.enum";

describe('ServiceErrorUcimpl', () => {
  let serviceErrorUc: ServiceErrorUcimpl;
  let mockServiceErrorProvider: jest.Mocked<IServiceErrorProvider>;

  beforeEach(async () => {
    mockServiceErrorProvider = {
      createServiceError: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceErrorUcimpl,
        { provide: IServiceErrorProvider, useValue: mockServiceErrorProvider },
      ],
    }).compile();

    serviceErrorUc = module.get<ServiceErrorUcimpl>(ServiceErrorUcimpl);
  });

  describe('createServiceError', () => {
    it('should create a service error', async () => {
      const error = { success: false, message: 'Test error' };
      const taskValue: Etask = Etask.CREATE;
      const task_description: ETaskDesc = ETaskDesc.CONSUMED_SERVICE;
      const task: ITaskError = { task_name: taskValue, task_description: task_description};
      const request = { data: 'Test request' };
      const tracingInfoPrincipal: IServiceTracingInicial = { id: '123', origen: 'Test', method: 'GET', channel: 'Test' };
      const nivel = ELevelsErros.ERROR;

      await serviceErrorUc.createServiceError(error, task, request, tracingInfoPrincipal, nivel);

      expect(mockServiceErrorProvider.createServiceError).toHaveBeenCalledWith({
        success: false,
        serviceid: '123',
        origen: 'Test',
        method: 'GET',
        tack: { task_description: 'Result service', task_name: 'PROCESS_CREATE' },
        message: 'Test error',
        channel: 'Test',
        stack: undefined,
        request: { data: 'Test request' },
        response: undefined,
      });
    });
  });
});