import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { Etask, ETaskDesc } from 'src/common/utils/enums/taks.enum';
import { GlobalValidateIService } from './globalValidate.service.impl';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import GeneralUtil from 'src/common/utils/generalUtil';
import Logging from 'src/common/lib/logging';
import Traceability from 'src/common/lib/traceability';
import { promises } from 'dns';

describe('GlobalValidateIService', () => {
  let globalValidateService: GlobalValidateIService;
  let serviceErrorMock: jest.Mocked<IServiceErrorUc>;
  let serviceTracingMock: jest.Mocked<IServiceTracingUc>;

  beforeEach(async () => {
    serviceErrorMock = {} as jest.Mocked<IServiceErrorUc>;
    serviceTracingMock = {
      createServiceTracing: jest.fn(),
    } as jest.Mocked<IServiceTracingUc>;

    globalValidateService = new GlobalValidateIService(serviceErrorMock, serviceTracingMock);
  });

  it('should return true for a valid channel', async () => {
    jest.spyOn(GeneralUtil, 'validateChannel').mockReturnValue(true);
    const channel = 'valid-channel';
    await expect(globalValidateService.validateChannel(channel)).resolves.toBe(true);
  });

  // it('should throw a BusinessException for an invalid channel', async () => {
  //   jest.spyOn(GeneralUtil, 'validateChannel').mockReturnValue(false);
  //   const channel = 'invalid-channel';
  //   await expect(globalValidateService.validateChannel(channel)).rejects.toThrow(BusinessException);
  // });
});