import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService, MongooseHealthIndicator, HttpHealthIndicator } from '@nestjs/terminus';
import { ResponseService } from './dto/response-service.dto';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import  servicesConfig  from 'src/common/configuration/services.config';
import { type HealthCheckResult } from '@nestjs/terminus';
import { type HealthIndicatorResult } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let health: jest.Mocked<HealthCheckService>;
  let dbMongo: jest.Mocked<MongooseHealthIndicator>;
  let http: jest.Mocked<HttpHealthIndicator>;

  beforeEach(async () => {
    health = {
      check: jest.fn(),
    } as unknown as jest.Mocked<HealthCheckService>;
   
    dbMongo = {
      pingCheck: jest.fn(),
    } as unknown as jest.Mocked<MongooseHealthIndicator>;

    http = {
      pingCheck: jest.fn(),
    } as unknown as jest.Mocked<HttpHealthIndicator>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: health },
        { provide: MongooseHealthIndicator, useValue: dbMongo },
        { provide: HttpHealthIndicator, useValue: http },
        
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);

  });

  describe('validate', () => {
    it('should return a response with status 200', async () => {
      const expectedResult: HealthCheckResult = {
        status: "ok",
        info: {
          database_mongo: {
            status: "up",
          },
        },
        error: {
        },
        details: {
          database_mongo: {
            status: "up",
          },
        },
      };
      health.check.mockResolvedValue(expectedResult);
      const response = await controller.validate();
      expect(response).toEqual(new ResponseService(true, EmessageMapping.DEFAULT, 200, {  
      'httpService': {
      'endPoint': 'http://localhost:8181/V1/Message',
      'name': 'test-service',
      'status': undefined,
       } ,
      'database':  {
        'database_mongo': 
         {'status': 'up', },
      }, 
    } ));
    });
  });

  describe('checkDB', () => {
    it('should return the database status', async () => {
      const expectedResult: HealthCheckResult = {
        status: "ok",
        info: {
          database_mongo: {
            status: "up",
          },
        },
        error: {
        },
        details: {
          database_mongo: {
            status: "up",
          },
        },
      };
      const checkSpy = jest.spyOn(health, 'check').mockResolvedValue(expectedResult);

      const status = await controller['checkDB']();

      expect(checkSpy).toHaveBeenCalledWith([expect.any(Function)]);
      //expect(status).toBe(expectedResult);
    });

    it('should return the error response if an error occurs', async () => {
      const error = new Error('Database error');
      const checkSpy = jest.spyOn(health, 'check').mockRejectedValue(error);

      const status = await controller['checkDB']();

      expect(checkSpy).toHaveBeenCalledWith([expect.any(Function)]);
      //expect(status).toBe(error.name);
    });
  });

  describe('checkServiceHttp', () => {
    it('should return the service status', async () => {
      const expectedResultPingCheck: HealthIndicatorResult = {
        database_mongo: {status: "up"}}
      const pingCheckSpy = jest.spyOn(http, 'pingCheck').mockResolvedValue(expectedResultPingCheck);

      const service = { name: 'test-service', endPoint: 'http://test-service.com' };
      const result = await controller['checkServiceHttp'](service);

      expect(pingCheckSpy).toHaveBeenCalledWith(service.name, service.endPoint);
      expect(result).toEqual({
             'endPoint': 'http://test-service.com',
             'name': 'test-service',
             'status': {
               'database_mongo': {
                 'status': 'up',
               },
             }
       });
    });

    it('should return the error status if an error occurs', async () => {
      const error = new Error('Service error');
      const pingCheckSpy = jest.spyOn(http, 'pingCheck').mockRejectedValue({ causes: { 'test-service': error } });

      const service = { name: 'test-service', endPoint: 'http://test-service.com' };
      const result = await controller['checkServiceHttp'](service);

      expect(pingCheckSpy).toHaveBeenCalledWith(service.name, service.endPoint);
      expect(result).toEqual({ name: 'test-service', endPoint: 'http://test-service.com', status: error });
    });
  });


});