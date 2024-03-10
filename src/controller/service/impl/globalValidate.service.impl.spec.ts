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
  let serviceError: jest.Mocked<IServiceErrorUc>;
  let serviceTracing: jest.Mocked<IServiceTracingUc>;
  
  jest.mock('src/common/lib/logging', () => {
    return {
      Logging: jest.fn().mockImplementation(() => {
        return {
          write: jest.fn(),
          // No necesitas mockear LOG_LEVEL y context si son privados
        };
      }),
    };
  });
  let logger = new Logging('prueba');

  beforeEach(() => {
    serviceError = {
    } as jest.Mocked<IServiceErrorUc>;

    serviceTracing = {
      createServiceTracing: jest.fn(),
    } as jest.Mocked<IServiceTracingUc>;

    logger = new Logging('prueba2');

    globalValidateService = new GlobalValidateIService(serviceError, serviceTracing);
  });

  describe('validateChannel', () => {
    it('should return true if the channel is valid', async () => {
      // Arrange
      const channel = 'valid-channel';
      jest.spyOn(GeneralUtil, 'validateChannel').mockReturnValue(true);

      // Act
      const result = await globalValidateService.validateChannel(channel);
      expect(result).toBe(true);
    });

    it('should throw a BusinessException if the channel is invalid', async () => {
      // Arrange
      const channel = 'invalid-channel';
      jest.spyOn(GeneralUtil, 'validateChannel').mockReturnValue(false);

      // Act
      const result = globalValidateService.validateChannel(channel);
      

    });

    it('should re-throw any error thrown during validation', async () => {
      // Arrange
      const channel = 'valid-channel';
      const error = new Error('Some error');
      jest.spyOn(GeneralUtil, 'validateChannel').mockImplementation(() => {
        throw error;
      });

      // Act
      const result = globalValidateService.validateChannel(channel);

      // Assert
      await expect(result).rejects.toThrowError(error);
      expect(serviceTracing.createServiceTracing).not.toHaveBeenCalled();
    });
  });
});