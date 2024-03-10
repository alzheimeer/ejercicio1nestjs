import { ExceptionManager } from "./exceptions-manager.filter";
import { ArgumentsHost, Body, HttpException } from "@nestjs/common";
import { Response } from 'express';
import { BusinessException } from "./business-exceptions";
import { ResponseService } from "../../controller/dto/response-service.dto";
import { EmessageMapping } from "../utils/enums/message.enum";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import GeneralUtil from "../utils/generalUtil";
import { ELevelsErros } from "../utils/enums/logging.enum";
import { EStatusTracingGeneral } from "../utils/enums/tracing.enum";
import Traceability from "./traceability";
import { ETaskTracingGeneral } from "../utils/enums/tracing.enum";
import { IServiceTracingUc } from "src/core/use-case/resource/service-tracing.resource.uc";
import { IServiceErrorUc } from "src/core/use-case/resource/service-error.resource.uc";
import { ITaskError } from "src/core/entity/service-error/task-error.entity";
import { IServiceTracingInicial } from "src/core/entity/service-tracing/service-tracing.entity";
import { Test, TestingModule } from '@nestjs/testing';
import { url } from "inspector";

describe('ExceptionManager', () => {
  let exceptionManager: ExceptionManager;
  let mockServiceTracingUc: jest.Mocked<IServiceTracingUc>;
  let mockServiceErrorUc: jest.Mocked<IServiceErrorUc>;
  let hostMock: jest.Mocked<ArgumentsHost>;
  let responseMock: Partial<Response>;
  //let generalMock: jest.Mocked<GeneralUtil>;
  

  beforeEach( async() => {
    mockServiceTracingUc = {
      createServiceTracing: jest.fn(),
    } as jest.Mocked<IServiceTracingUc>;

    mockServiceErrorUc = {
      createServiceError: jest.fn(),
    } as jest.Mocked<IServiceErrorUc>;

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    hostMock = {
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(responseMock),
        getRequest: jest.fn().mockReturnValue( {url: "/test", body: "", headers: {channel: "channeltest"}}),

      }),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    } as jest.Mocked<ArgumentsHost>;


    //generalMock = {
    //  getOrigin: jest.fn(url => 'test'),
    //} as jest.Mocked<GeneralUtil>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IServiceTracingUc, useValue: mockServiceTracingUc },
        { provide: IServiceErrorUc, useValue: mockServiceErrorUc },
      ],
    }).compile();

    
    exceptionManager = new ExceptionManager(mockServiceTracingUc, mockServiceErrorUc);
  
  });



  describe('catch', () => {
    it('should handle BusinessException', async () => {
      const exception = new BusinessException(1,'Error message', false);
      const cont = await exceptionManager.catch(exception, hostMock);
      
      expect(mockServiceTracingUc.createServiceTracing).toHaveBeenCalled();

    });

    it('should handle HttpException', async () => {
      const exception = new HttpException('Internal Server Error', 500);
      const cont = await exceptionManager.catch(exception, hostMock);
      
      expect(mockServiceErrorUc.createServiceError).toHaveBeenCalled();

    });

    it('should handle other exceptions', async () => {
      const exception = new Error('Unknown Error');
      const cont = await exceptionManager.catch(exception, hostMock);
      
      expect(mockServiceErrorUc.createServiceError).toHaveBeenCalled();

    });



  });
});


