import { HttpPruebaUcimpl } from './http-prueba.uc.impl';
import { IHttpPruebaProvider } from 'src/data-provider/http-prueba.provider';

describe('HttpPruebaUcimpl', () => {
  let uc: HttpPruebaUcimpl;
  let providerMock: jest.Mocked<IHttpPruebaProvider>;

  beforeEach(() => {
    providerMock = {
      getById: jest.fn(),
      getAll: jest.fn(),
    } as jest.Mocked<IHttpPruebaProvider>;

    uc = new HttpPruebaUcimpl(providerMock);
  });

  describe('getById', () => {
    it('should call the provider getById method with the given id', async () => {
      const id = 'test-id';
      const expectedResult = Promise.resolve({ 
      url: 'test-id',
      source: 'test-source',
      method: 'test-method',
      headers: 'test-headers',
      params: 'test-params',
      data: 'test-data',
      timeout: 'test-timeout',
      executed: true,
    });

      providerMock.getById.mockResolvedValue(expectedResult);

      const result = await uc.getById(id);

      expect(providerMock.getById).toHaveBeenCalledWith(id);
     
    });
  });

  describe('getAll', () => {
    it('should call the provider getAll method with the given page and limit', async () => {
      const page = 1;
      const limit = 10;
      const expectedResult = Promise.resolve({ 
        url: 'test-id',
        source: 'test-source',
        method: 'test-method',
        headers: 'test-headers',
        params: 'test-params',
        data: 'test-data',
        timeout: 'test-timeout',
        executed: true,
      });

      providerMock.getAll.mockResolvedValue(expectedResult);

      const result = await uc.getAll(page, limit);

      expect(providerMock.getAll).toHaveBeenCalledWith(page, limit);
     
    });
  });
});