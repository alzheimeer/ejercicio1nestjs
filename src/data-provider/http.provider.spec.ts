import { Test, TestingModule } from '@nestjs/testing';
import { IHttpProvider } from './http.provider';
import { IRequestConfigHttp, IRequestConfigHttpSOAP, EHttpMethod } from './model/http/request-config-http.model';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { ResponseHttp } from './model/http/response-http.model';

describe('IHttpProvider', () => {
  let httpProvider: IHttpProvider;

  beforeEach(async () => {
    httpProvider = {
      executeRest: jest.fn(),
      executeSOAP: jest.fn(),
    } as unknown as jest.Mocked<IHttpProvider>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IHttpProvider, useValue: httpProvider },
      ],
    }).compile();

    httpProvider = module.get<IHttpProvider>(IHttpProvider);
  });

  describe('executeRest', () => {
    it('should return a ResponseHttp object', async () => {

      const methodvalue: EHttpMethod.get = EHttpMethod.get;

      const requestConfig: IRequestConfigHttp = {
        method: methodvalue,
        url: 'http://test.com'
      };
      const task: Etask = Etask.CONSUMED_SERVICE;
      const response: ResponseHttp = {
        executed: true,
        message: 'success',
        status: 200,
        data: {} // provide the expected response data
      };

      jest.spyOn(httpProvider, 'executeRest').mockResolvedValue(response);

      const result = await httpProvider.executeRest(requestConfig, task);

      expect(result).toEqual(response);
    });
  });

  describe('executeSOAP', () => {
    it('should return a ResponseHttp object', async () => {
      
      const requestConfig: IRequestConfigHttpSOAP = {
        soapAction: 'prueba',
        url: 'http://test.com',
        data: 'prueba data'
      };
      const task: Etask = Etask.CONSUMED_SERVICE;
      const response: ResponseHttp = {
        executed: true,
        message: 'success',
        status: 200,
        data: {} 
      };

      jest.spyOn(httpProvider, 'executeSOAP').mockResolvedValue(response);

      const result = await httpProvider.executeSOAP(requestConfig, task);

      expect(result).toEqual(response);
    });
  });
});