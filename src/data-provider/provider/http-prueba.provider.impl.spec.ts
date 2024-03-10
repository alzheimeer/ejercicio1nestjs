import { Test, TestingModule } from '@nestjs/testing';
import { HttpPruebaProvider } from './http-prueba.provider.impl';
import { IHttpProvider } from '../http.provider';
import { ResponseHttp } from '../model/http/response-http.model';

describe('HttpPruebaProvider', () => {
  let httpPruebaProvider: HttpPruebaProvider;
  let mockHttpProvider: jest.Mocked<IHttpProvider>;

  beforeEach(async () => {
    const mockHttpProviderInstance: IHttpProvider = {
      executeRest: jest.fn(),
      executeSOAP: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpPruebaProvider,
        { provide: IHttpProvider, useValue: mockHttpProviderInstance },
      ],
    }).compile();

    httpPruebaProvider = module.get<HttpPruebaProvider>(HttpPruebaProvider);
    mockHttpProvider = module.get<IHttpProvider>(IHttpProvider) as jest.Mocked<IHttpProvider>;
  });

  describe('getById', () => {
    it('should return the response from the HTTP provider', async () => {
      const _id = '123';
      const expectedResponse: ResponseHttp<any> = {
        executed: true
      };
      mockHttpProvider.executeRest.mockResolvedValue(expectedResponse);

      const result = await httpPruebaProvider.getById(_id);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw an error if the HTTP provider throws an error', async () => {
      const _id = '123';
      const expectedError = new Error('HTTP provider error');
      mockHttpProvider.executeRest.mockRejectedValue(expectedError);

      await expect(httpPruebaProvider.getById(_id)).rejects.toThrow(expectedError);
    });
  });

  describe('getAll', () => {
    it('should return the response from the HTTP provider', async () => {
      const page = 1;
      const limit = 10;
      const expectedResponse: ResponseHttp = {
        executed: true
      };
      mockHttpProvider.executeRest.mockResolvedValue(expectedResponse);

      const result = await httpPruebaProvider.getAll(page, limit);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw an error if the HTTP provider throws an error', async () => {
      const page = 1;
      const limit = 10;
      const expectedError = new Error('HTTP provider error');
      mockHttpProvider.executeRest.mockRejectedValue(expectedError);

      await expect(httpPruebaProvider.getAll(page, limit)).rejects.toThrow(expectedError);

      
    });
  });
});