import { Test, TestingModule } from '@nestjs/testing';
import { IHttpPruebaProvider } from './http-prueba.provider';
import { ResponseHttp } from './model/http/response-http.model';

describe('IHttpPruebaProvider', () => {
  let httpPruebaProvider: IHttpPruebaProvider;

  beforeEach(async () => {
    httpPruebaProvider = {
      getById: jest.fn(),
      getAll: jest.fn(),
    } as unknown as jest.Mocked<IHttpPruebaProvider>;
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IHttpPruebaProvider, useValue: httpPruebaProvider },
      ],
    }).compile();
  
    httpPruebaProvider = module.get<IHttpPruebaProvider>(IHttpPruebaProvider);
  });

  describe('getById', () => {
    it('should return a ResponseHttp object', async () => {
      const id = '123';
      const response: ResponseHttp = {
        executed: true,
        message: 'suscess',
        status: 201,
      };

      jest.spyOn(httpPruebaProvider, 'getById').mockResolvedValue(response);

      const result = await httpPruebaProvider.getById(id);

      expect(result).toEqual(response);
    });
  });

  describe('getAll', () => {
    it('should return a ResponseHttp object', async () => {
      const page = 1;
      const limit = 10;
      const response: ResponseHttp = {
        executed: true,
        message: 'suscess',
        status: 201,
      };

      jest.spyOn(httpPruebaProvider, 'getAll').mockResolvedValue(response);

      const result = await httpPruebaProvider.getAll(page, limit);

      expect(result).toEqual(response);
    });
  });
});