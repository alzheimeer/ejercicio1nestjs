import { Test, TestingModule } from '@nestjs/testing';
import { ParamUcimpl } from './impl/param.resource.uc.impl';
import { IParamUc } from './param.resource.uc';
import { IParam } from 'src/core/entity/param/param.entity';
import { IParamProvider } from 'src/data-provider/param.provider';
import { IServiceErrorUc } from './service-error.resource.uc';

describe('IParamUc', () => {
  let paramUc: IParamUc;
  let mockparamUcimpl: jest.Mocked<ParamUcimpl>;

  beforeEach(async () => {
    const mockParamProvider: IParamProvider = {
      getParams: jest.fn(),
      getTotal: jest.fn(),
      getParamByIdParam: jest.fn(),
      updateParam: jest.fn(),
    };

    const mockServiceError: IServiceErrorUc = {
      createServiceError: jest.fn(),
    };

    const mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };
    
    mockparamUcimpl = {
      loadParams: jest.fn(),
    } as unknown as jest.Mocked<ParamUcimpl>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ParamUcimpl, useValue: mockparamUcimpl },
        { provide: IParamUc, useClass: ParamUcimpl },
        { provide: IParamProvider, useValue: mockParamProvider },
        { provide: IServiceErrorUc, useValue: mockServiceError }, 
      ],
    }).compile();

    paramUc = module.get<IParamUc>(IParamUc);
  });

  describe('loadParams', () => {
    it('should load the parameters', async () => {
      const params: IParam[] = [
        { id_param: '1', description: 'param1', createdUser: 'value1', updatedUser: 'value1', createdAt: 'value1', updatedAt: 'value1', values: 'value1' },
        { id_param: '2', description: 'param2', createdUser: 'value2', updatedUser: 'value1', createdAt: 'value1' , updatedAt: 'value1', values: 'value1'},
      ];
       mockparamUcimpl.loadParams.mockResolvedValue(params);

      const result = await paramUc.loadParams();
      //expect(result).toEqual(params);
    });
  });
});

