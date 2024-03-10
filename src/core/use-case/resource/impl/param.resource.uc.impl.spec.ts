import { Test, TestingModule } from '@nestjs/testing';
import { ParamUcimpl } from './param.resource.uc.impl';
import { IParamProvider } from 'src/data-provider/param.provider';
import { IServiceErrorUc } from '../service-error.resource.uc';

describe('ParamUcimpl', () => {
  let paramUc: ParamUcimpl;
  let mockParamProvider: jest.Mocked<IParamProvider>;
  let mockServiceError: jest.Mocked<IServiceErrorUc>;

  beforeEach(async () => {
    mockParamProvider = {
      getParams: jest.fn(),
    } as unknown as jest.Mocked<IParamProvider>;

    mockServiceError = {
      createServiceError: jest.fn(),
    } as unknown as jest.Mocked<IServiceErrorUc>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParamUcimpl,
        { provide: IParamProvider, useValue: mockParamProvider },
        { provide: IServiceErrorUc, useValue: mockServiceError },
      ],
    }).compile();

    paramUc = module.get<ParamUcimpl>(ParamUcimpl);
  });

  describe('onModuleInit', () => {
    it('should load the params on module initialization', async () => {
      const params = [
        { id_param: '1', description: 'param1', createdUser: 'value1', updatedUser: 'value1', createdAt: 'value1', updatedAt: 'value1', values: 'value1' },
        { id_param: '2', description: 'param2', createdUser: 'value2', updatedUser: 'value1', createdAt: 'value1' , updatedAt: 'value1', values: 'value1'},
      ];
      mockParamProvider.getParams.mockResolvedValue(params);

      await paramUc.onModuleInit();

      expect(mockParamProvider.getParams).toHaveBeenCalledWith(1, 100, {});
      expect(ParamUcimpl.params).toEqual(params);
    });

    it('should handle error when loading params', async () => {
      const error = new Error('Failed to load params');
      mockParamProvider.getParams.mockRejectedValue(error);

      await paramUc.onModuleInit();

      expect(mockParamProvider.getParams).toHaveBeenCalledWith(1, 100, {});
    
    });
  });
});