import { HttpPruebaService } from './http-provider.service.impl';
import { IHttpPruebaUc } from 'src/core/use-case/http-prueba.uc';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import  GeneralUtil  from 'src/common/utils/generalUtil';

describe('HttpPruebaService', () => {
  let httpPruebaService: HttpPruebaService;
  let httpPruebaUc: jest.Mocked<IHttpPruebaUc>;

  beforeEach(() => {
    httpPruebaUc = {
      getById: jest.fn(),
      getAll: jest.fn(),
    } as jest.Mocked<IHttpPruebaUc>;

    httpPruebaService = new HttpPruebaService(httpPruebaUc);
  });

  describe('getById', () => {
    it('should return a response with the result when successful', async () => {
      // Arrange
      const _id = '123';
      const expectedResult = { id: '123', name: 'Test' };
      httpPruebaUc.getById.mockResolvedValue(expectedResult);

      // Act
      const result = await httpPruebaService.getById(_id);

      // Assert
      expect(result).toEqual(
        new ResponseService(true, 'DEFAULT', 200, expectedResult)
      );
      expect(httpPruebaUc.getById).toHaveBeenCalledWith(_id);
    });

    it('should throw an error and assign task error when an error occurs', async () => {
      // Arrange
      const _id = '123';
      const error = new Error('Some error');
      httpPruebaUc.getById.mockRejectedValue(error);

      // Act & Assert
      await expect(httpPruebaService.getById(_id)).rejects.toThrowError(error);
    });
  });

  describe('getAll', () => {
    it('should return a response with the result when successful', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const expectedResult = [{ id: '1', name: 'Test 1' }, { id: '2', name: 'Test 2' }];
      httpPruebaUc.getAll.mockResolvedValue(expectedResult);

      // Act
      const result = await httpPruebaService.getAll(page, limit);

      // Assert
      expect(result).toEqual(
        new ResponseService(
          true,
          expectedResult ? 'Consulta ejecutada correctamente.' : 'No se encontraron datos.',
          200,
          expectedResult
        )
      );
      expect(httpPruebaUc.getAll).toHaveBeenCalledWith(page, limit);
    });

    it('should throw an error and assign task error when an error occurs', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const error = new Error('Some error');
      httpPruebaUc.getAll.mockRejectedValue(error);

      // Act & Assert
      await expect(httpPruebaService.getAll(page, limit)).rejects.toThrowError(error);

    });
  });
});